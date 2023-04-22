import { Element } from '@classes/complex-elements/element'
import { ElementNode } from '@classes/nodes/element-node'
import { Concrete, Steel } from '@classes/others/material'
import { RectangularSpanLoad } from '@classes/others/rectangular-span-load'
import { BarCR } from '@classes/sections/bar-cr'
import { RectangularRCSection } from '@classes/sections/rectangular-cr'
import {
	FileElementData,
	FileHingeData,
	FileLoadData,
	FileMaterialData,
	FileNodeData,
	FileReinforcementSectionData,
	FileSectionData,
	FramezFile,
	IElement,
	INode,
} from '@interfaces'
import { initialFinal } from '@types'
import { assignHinges2Element } from './moment-curvature'
import { FrameSystem } from '@classes/complex-elements/frame-system'

export function generateStructureFromFile(file: FramezFile) {
	const { _elements } = file
	const elements: IElement[] = []
	const nodesCache: INode[] = []

	_elements.forEach((elementData) => {
		let element = generateElementFromFile(elementData, nodesCache)
		elements.push(element)
	})

	const structure = new FrameSystem(...elements)
	return structure
}

function generateElementFromFile(data: FileElementData, nodesCache: INode[]) {
	const { _loads, _nodes, section, initialHinge, finalHinge } = data

	const initialNode = generateNodeFromFile(_nodes.initial, nodesCache)
	const finalNode = generateNodeFromFile(_nodes.final, nodesCache)
	const elementSection = generateSectionFromFile(section)

	const element = new Element(initialNode, finalNode, elementSection)

	_loads.forEach((load) => generateLoadFromFile(element, load))

	generateHingesFromFile(element, {
		initial: initialHinge,
		final: finalHinge,
	})

	return element
}
function generateHingesFromFile(
	element: IElement,
	data: initialFinal<FileHingeData>,
) {
	const { initial, final } = data
	assignHinges2Element({
		element,
		node: 'initial',
		hingeType: 'Custom',
		curvature: {
			max: initial.maxCurv,
			min: initial.minCurve,
		},
		moment: {
			max: initial.maxMoment,
			min: initial.minMoment,
		},
	})
	element.initialHinge!.isCollapsed = data.initial.isCollapsed
	element.initialHinge!.isNegativeCollapsed = data.initial.isNegativeCollapsed
	element.initialHinge!.isPositiveCollapsed = data.initial.isPositiveCollapsed

	assignHinges2Element({
		element,
		node: 'final',
		hingeType: 'Custom',
		curvature: {
			max: final.maxCurv,
			min: final.minCurve,
		},
		moment: {
			max: final.maxMoment,
			min: final.minMoment,
		},
	})
	element.finalHinge!.isCollapsed = data.final.isCollapsed
	element.finalHinge!.isNegativeCollapsed = data.final.isNegativeCollapsed
	element.finalHinge!.isPositiveCollapsed = data.final.isPositiveCollapsed
}
// function generateReleasesFromFile(
// 	element: IElement,
// 	data: { initial: FileReleaseData; final: FileReleaseData },
// ) {
// 	if (data['initial']['dx']) element.release('initial', 'dx')
// 	if (data['initial']['dy']) element.release('initial', 'dy')
// 	if (data['initial']['rz']) element.release('initial', 'rz')
// 	if (data['final']['dx']) element.release('final', 'dx')
// 	if (data['final']['dy']) element.release('final', 'dy')
// 	if (data['final']['rz']) element.release('final', 'rz')
// }
function generateSectionFromFile(data: FileSectionData) {
	const { b, h, material, _reinforcement } = data

	const sectionMaterial = generateMaterialFromFile(material)
	const section = new RectangularRCSection(b, h, sectionMaterial)

	_reinforcement.forEach((row) => {
		const barSection = generateReinforcementSectionFromFile(row.section)
		section.addRowReinforcement(row.distance, row.quantity, barSection)
	})

	return section
}
function generateReinforcementSectionFromFile(
	data: FileReinforcementSectionData,
) {
	const { material, diameter } = data
	const { name, fy, young, weight } = material

	const steel = new Steel(name, young, weight, fy)
	const section = new BarCR(diameter, steel)
	return section
}
function generateMaterialFromFile(data: FileMaterialData) {
	const { name, fc, young, epsilon_max, weight } = data
	const material = new Concrete(name, fc, weight, young, epsilon_max)
	return material
}
function generateLoadFromFile(element: IElement, data: FileLoadData) {
	const load = new RectangularSpanLoad(
		element,
		data.load,
		data.distance.initial,
		data.distance.final,
	)
	return load
}
function generateNodeFromFile(data: FileNodeData, nodesCache: INode[]) {
	const coincidence = getNodeCoincidenceByCoords(data, nodesCache)
	if (coincidence) return coincidence

	const node = new ElementNode({ ...data._coordinates })
	node.constraints = { ...data.constraints }
	node.setLoads({ ...data._loads })
	node.setDisplacements({ ...data._displacements })
	node.setReactions({ ...data._reactions })

	nodesCache.push(node)
	return node
}

function findFileNodeDataIndex(data: FileNodeData, nodesCache: INode[]) {
	const { _coordinates } = data
	const filter = (node: INode) => {
		const coordinates = node.coordinates('static')
		const coordsMatch =
			coordinates.x === _coordinates.x && coordinates.y === _coordinates.y
		return coordsMatch
	}
	return nodesCache.findIndex(filter)
}
function getNodeCoincidenceByCoords(data: FileNodeData, nodesCache: INode[]) {
	let index = findFileNodeDataIndex(data, nodesCache)
	return index === -1 ? undefined : nodesCache[index]
}
