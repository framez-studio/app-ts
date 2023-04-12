import {
	INode,
	IElementContext,
	IStructureGeneratorState,
	IElementPropsState,
	IElementSteelState,
	IElementDynamicState,
	IGeneratorConfig,
	IGeneratorElementConfig,
	IElement,
	IRectangularRCSection,
	IFramezStep,
} from '@interfaces'
import { Element } from '@classes/complex-elements/element'
import { ElementNode } from '@classes/nodes/element-node'
import { Support } from '@classes/nodes/support'
import { Concrete, Steel } from '@classes/others/material'
import { RectangularSpanLoad } from '@classes/others/rectangular-span-load'
import { RectangularRCSection } from '@classes/sections/rectangular-cr'
import { isRowFull } from './ui'
import { BarCR } from '@classes/sections/bar-cr'
import { assignHinges2Element } from './moment-curvature'
import { FrameSystem } from '@classes/complex-elements/frame-system'

export function generateFramezSystem(config: IGeneratorConfig) {
	const { levels, spans } = config

	const nodes = generateNodes(spans, levels)
	const { beams } = generateBeams(config, nodes)
	const { columns } = generateColumns(config, nodes)

	const structure = new FrameSystem(...beams, ...columns)

	return { beams, columns, structure }
}
export function generateFramezSystemFromContext(context: {
	state: IStructureGeneratorState
	columnsContext: IElementContext
	beamsContext: IElementContext
}) {
	const config = extractConfigFromContext(context)
	return generateFramezSystem(config)
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
		levels: new Array(Number(levels.count)).fill(Number(levels.separation)),
		spans: new Array(Number(spans.count)).fill(Number(spans.separation)),
		columns,
		beams,
	}
	return config
}
function generateNodes(spans: number[], levels: number[]) {
	const nodes: INode[][] = []
	let heightSum = 0

	levels.forEach((height, l) => {
		heightSum += height
		let level: INode[]
		let lengthSum: number

		if (l == 0) {
			lengthSum = 0
			level = []
			spans.forEach((length, s) => {
				lengthSum += length
				if (s == 0) {
					level.push(new Support('fixed', { x: 0, y: 0 }))
				}
				level.push(new Support('fixed', { x: lengthSum, y: 0 }))
			})
			nodes.push(level)
		}
		lengthSum = 0
		level = []
		spans.forEach((length, s) => {
			lengthSum += length
			if (s == 0) {
				level.push(new ElementNode({ x: 0, y: heightSum }))
			}
			level.push(new ElementNode({ x: lengthSum, y: heightSum }))
		})

		nodes.push(level)
	})
	return nodes
}
function generateColumns(
	config: IGeneratorConfig,
	nodes: INode[][],
): { columns: IElement[]; levels: IFramezStep[] } {
	const { spans, levels, columns } = config
	const columnsArr: IElement[] = []
	const levelsArr: IFramezStep[] = []

	levels.forEach((height, l) => {
		levelsArr.push({ index: l, separation: height, elements: [] })

		const [iNode, fNode] = [nodes[l][0], nodes[l + 1][0]]
		const firstElement = generateElement(columns, iNode, fNode)
		levelsArr[l].elements.push(firstElement)

		spans.forEach((_, s) => {
			const [iNode, fNode] = [nodes[l][s + 1], nodes[l + 1][s + 1]]
			const element = generateElement(columns, iNode, fNode)
			levelsArr[l].elements.push(element)
		})
		columnsArr.push(...levelsArr[l].elements)
	})
	return { columns: columnsArr, levels: levelsArr }
}
function generateBeams(
	config: IGeneratorConfig,
	nodes: INode[][],
): { beams: IElement[]; levels: IFramezStep[] } {
	const { spans, levels, beams } = config
	const beamsArr: IElement[] = []
	const spansArr: IFramezStep[] = []

	spans.forEach((length, s) => {
		spansArr.push({ index: s, separation: length, elements: [] })

		levels.forEach((_, l) => {
			const [iNode, fNode] = [nodes[l + 1][s], nodes[l + 1][s + 1]]
			const element = generateElement(beams, iNode, fNode)
			spansArr[s].elements.push(element)
		})
		beamsArr.push(...spansArr[s].elements)
	})
	return { beams: beamsArr, levels: spansArr }
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
	const section = generateSection(config)
	const element = new Element(iNode, fNode, section)
	generateHinges(config, element)
	element.setSpanLoad(new RectangularSpanLoad(element, config.load))
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
	const { moment, curvature, automatic } = momentCurvature

	if (automatic) {
		console.log(element.section.reinforcement)
		assignHinges2Element({
			element,
			node: 'both',
			hingeType: 'Moment',
		})
		return
	}

	if (!moment)
		throw new Error('Nominal moment is not defined in generator config')
	if (!curvature)
		throw new Error('Curvature is not defined in generator config')

	assignHinges2Element({
		element,
		node: 'both',
		hingeType: 'Custom',
		moment,
		curvature,
	})
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
