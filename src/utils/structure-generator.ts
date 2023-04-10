import {
	INode,
	IElementContext,
	IStructureGeneratorState,
	IElementPropsState,
	IElementSteelState,
	IElementDynamicState,
	IGeneratorConfig,
	IGeneratorElementConfig,
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
function generateColumns(config: IGeneratorConfig, nodes: INode[][]) {
	const { spans, levels, columns } = config
	const { young, weight, fc, epsilon_max } = columns.material
	const { base, height } = columns.section
	const { steel } = columns
	const columnsArr = []

	for (let j = 0; j <= spans.count; j++) {
		for (let i = 0; i <= levels.count - 1; i++) {
			let material = new Concrete(
				'custom',
				fc,
				weight,
				young,
				epsilon_max,
			)
			let section = new RectangularRCSection(base, height, material)

			let iNode = nodes[i][j]
			let fNode = nodes[i + 1][j]
			let element = new Element(iNode, fNode, section)

			element.setSpanLoad(new RectangularSpanLoad(element, 0))
			steel.rows.forEach((row) => {
				if (isRowFull(row)) {
					let { diameter, distance, quantity } = row
					let { young, fy } = steel

					const material = new Steel('custom', young, 0, fy)
					const section = new BarCR(diameter, material)

					element.section.addRowReinforcement(
						distance,
						quantity,
						section,
					)
				}
			})

			columnsArr.push(element)
		}
	}
	return columnsArr
}
function generateBeams(config: IGeneratorConfig, nodes: INode[][]) {
	const { spans, levels, beams } = config
	const { young, weight, fc, epsilon_max } = beams.material
	const { base, height } = beams.section
	const { steel } = beams
	const beamsArr = []

	for (let i = 1; i <= levels.count; i++) {
		for (let j = 0; j <= spans.count - 1; j++) {
			let material = new Concrete(
				'custom',
				fc,
				weight,
				young,
				epsilon_max,
			)
			let section = new RectangularRCSection(base, height, material)

			let iNode = nodes[i][j]
			let fNode = nodes[i][j + 1]
			let element = new Element(iNode, fNode, section)

			element.setSpanLoad(new RectangularSpanLoad(element, 20))
			steel.rows.forEach((row) => {
				if (isRowFull(row)) {
					let { diameter, distance, quantity } = row
					let { young, fy } = steel

					const material = new Steel('custom', young, 0, fy)
					const section = new BarCR(diameter, material)

					element.section.addRowReinforcement(
						distance,
						quantity,
						section,
					)
				}
			})

			beamsArr.push(element)
		}
	}
	return beamsArr
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
	if (state.yield === '' || state.young === '') {
		return false
	}
	for (let i = 0; i < state.rows.length; i++) {
		let row = state.rows[i]
		if (row.quantity === '' || row.distance === '' || row.diameter === '') {
			return false
		}
	}
	return true
}
function checkElementDynamicsState(state: IElementDynamicState) {
	let { curvature, moment, weight } = state
	if (
		weight === '' ||
		moment.max === '' ||
		moment.min === '' ||
		curvature.max === '' ||
		curvature.min === ''
	) {
		return false
	}
	return true
}
