import {
	INode,
	IElementContext,
	IStructureGeneratorState,
	IElementPropsState,
	IElementSteelState,
	IElementDynamicState,
	IGeneratorConfig,
	IGeneratorElementConfig,
	ISection,
	IElement,
	IRectangularRCSection,
} from '@interfaces'
import { Element } from '@classes/complex-elements/element'
import { Structure } from '@classes/complex-elements/structure'
import { ElementNode } from '@classes/nodes/element-node'
import { Support } from '@classes/nodes/support'
import { Concrete, Steel } from '@classes/others/material'
import { RectangularSpanLoad } from '@classes/others/rectangular-span-load'
import { RectangularRCSection } from '@classes/sections/rectangular-cr'
import { isRowFull } from './ui'
import { BarCR } from '@classes/sections/bar-cr'

export function generatePorticSystem(config: IGeneratorConfig) {
	const { levels, spans } = config

	const nodes = generateNodes(spans, levels)
	const beams = generateBeams(config, nodes)
	const columns = generateColumns(config, nodes)

	const structure = new Structure(...beams, ...columns)

	return { beams, columns, structure }
}
export function generatePorticSystemFromContext(context: {
	state: IStructureGeneratorState
	columnsContext: IElementContext
	beamsContext: IElementContext
}) {
	const config = extractConfigFromContext(context)
	return generatePorticSystem(config)
}
function extractConfigFromContext(context: {
	state: IStructureGeneratorState
	columnsContext: IElementContext
	beamsContext: IElementContext
}): IGeneratorConfig {
	const { state, columnsContext, beamsContext } = context
	if (!checkStructureState(state))
		throw new Error('Structure state is not valid')
	if (!checkElementContext(columnsContext))
		throw new Error('Columns context is not valid')
	if (!checkElementContext(beamsContext))
		throw new Error('Beams context is not valid')
	const { levels, spans } = state
	const columns = extractElementConfigFromContext(columnsContext)
	const beams = extractElementConfigFromContext(beamsContext)
	const config: IGeneratorConfig = {
		levels: {
			count: Number(levels.count),
			separation: Number(levels.separation),
		},
		spans: {
			count: Number(spans.count),
			separation: Number(spans.separation),
		},
		columns,
		beams,
	}
	return config
}
function generateNodes(
	spans: { count: number; separation: number },
	levels: { count: number; separation: number },
) {
	const nodes: INode[][] = []
	for (let i = 0; i <= levels.count; i++) {
		let level = []

		for (let j = 0; j <= spans.count; j++) {
			let coords = { x: j * spans.separation, y: i * levels.separation }
			let node =
				i == 0 ? new Support('fixed', coords) : new ElementNode(coords)
			level.push(node)
		}
		nodes.push(level)
	}
	return nodes
}
function generateColumns(
	config: IGeneratorConfig,
	nodes: INode[][],
): IElement[] {
	const { spans, levels, columns } = config
	const { load } = columns
	const columnsArr = []

	for (let j = 0; j <= spans.count; j++) {
		for (let i = 0; i <= levels.count - 1; i++) {
			const [iNode, fNode] = [nodes[i][j], nodes[i + 1][j]]
			const element = generateElement(columns, iNode, fNode)
			element.setSpanLoad(new RectangularSpanLoad(element, load))
			columnsArr.push(element)
		}
	}
	return columnsArr
}
function generateBeams(config: IGeneratorConfig, nodes: INode[][]): IElement[] {
	const { spans, levels, beams } = config
	const { load } = beams
	const beamsArr = []

	for (let i = 1; i <= levels.count; i++) {
		for (let j = 0; j <= spans.count - 1; j++) {
			const [iNode, fNode] = [nodes[i][j], nodes[i][j + 1]]
			const element = generateElement(beams, iNode, fNode)
			element.setSpanLoad(new RectangularSpanLoad(element, load))
			beamsArr.push(element)
		}
	}
	return beamsArr
}
function generateSection(config: IGeneratorElementConfig) {
	const { young, weight, fc, epsilon_max } = config.material
	const { base, height } = config.section

	let material = new Concrete('custom', fc, weight, young, epsilon_max)
	let section = new RectangularRCSection(base, height, material)

	generateReinforcement(config, section)
	return section
}
function generateElement(
	config: IGeneratorElementConfig,
	iNode: INode,
	fNode: INode,
): IElement {
	const { momentCurvature } = config
	const section = generateSection(config)
	const element = new Element(iNode, fNode, section)
	element.setSpanLoad(new RectangularSpanLoad(element, 0))
	return element
}
function generateReinforcement(
	config: IGeneratorElementConfig,
	section: IRectangularRCSection,
) {
	const { steel } = config
	steel.rows.forEach((row) => {
		if (isRowFull(row)) {
			let { diameter, distance, quantity } = row
			let { young, fy } = steel

			const steelMaterial = new Steel('custom', young, 0, fy)
			const steelSection = new BarCR(diameter, steelMaterial)

			section.addRowReinforcement(distance, quantity, steelSection)
		}
	})
}
function generateHinges(config: IGeneratorElementConfig, element: IElement) {
	const { momentCurvature } = config
	if (momentCurvature.automatic) return
	const { moment, curvature } = momentCurvature
	if (!moment) throw new Error('Moment is not defined in generator config')
	if (!curvature)
		throw new Error('Curvature is not defined in generator config')
}
function extractElementConfigFromContext(context: IElementContext) {
	const { elementProps, elementSteel, elementDynamics } = context

	const { state: elementPropsState } = elementProps
	const { state: elementSteelState } = elementSteel
	const { state: elementDynamicsState } = elementDynamics

	const { sectionDims } = elementPropsState

	let config: IGeneratorElementConfig = {
		material: {
			young: Number(elementPropsState.young),
			weight: Number(elementDynamicsState.weight),
			fc: Number(elementPropsState.fc),
			epsilon_max: Number(elementPropsState.epsilon),
		},
		section: {
			base: Number(sectionDims.base),
			height: Number(sectionDims.height),
		},
		steel: {
			young: Number(elementSteelState.young),
			fy: Number(elementSteelState.yield),
			rows: elementSteelState.rows.map((row) => ({
				diameter: Number(row.diameter),
				distance: Number(row.distance),
				quantity: Number(row.quantity),
			})),
		},
		load: Number(elementPropsState.load),
		momentCurvature: {
			automatic: elementDynamicsState.automatic,
			moment: {
				min: Number(elementDynamicsState.moment.min),
				max: Number(elementDynamicsState.moment.max),
			},
			curvature: {
				min: Number(elementDynamicsState.curvature.min),
				max: Number(elementDynamicsState.curvature.max),
			},
		},
	}
	return config
}
function checkStructureState(state: IStructureGeneratorState) {
	let { levels, spans } = state
	let { count: levelsCount, separation: levelsSeparation } = levels
	let { count: spansCount, separation: spansSeparation } = spans
	if (
		levelsCount === '' ||
		levelsSeparation === '' ||
		spansCount === '' ||
		spansSeparation === ''
	) {
		return false
	}
	return true
}
function checkElementContext(context: IElementContext) {
	let { elementProps, elementSteel, elementDynamics } = context

	if (!checkElementPropsState(elementProps.state))
		throw new Error('Element props are not valid')
	if (!checkElementSteelState(elementSteel.state))
		throw new Error('Element steel props are not valid')
	if (!checkElementDynamicsState(elementDynamics.state))
		throw new Error('Element dynamics props are not valid')

	return true
}
function checkElementPropsState(state: IElementPropsState) {
	let { epsilon, load, sectionDims, young } = state
	if (
		epsilon === '' ||
		load === '' ||
		sectionDims.base === '' ||
		sectionDims.height === '' ||
		young === ''
	) {
		return false
	}
	return true
}
function checkElementSteelState(state: IElementSteelState) {
	const { young, yield: fy, rows } = state

	if (Number(fy) === 0 || Number(young) === 0) return false

	for (let i = 0; i < rows.length; i++) {
		let row = rows[i]
		let { diameter, distance, quantity } = row
		if (
			Number(quantity) === 0 ||
			Number(distance) === 0 ||
			Number(diameter) === 0
		)
			return false
	}
	return true
}
function checkElementDynamicsState(state: IElementDynamicState) {
	let { curvature, moment, weight, automatic } = state
	if (weight === '') return false
	if (!automatic) {
		return (
			Number(moment.max) !== 0 &&
			Number(moment.min) !== 0 &&
			Number(curvature.max) !== 0 &&
			Number(curvature.min) !== 0
		)
	}
	return true
}
