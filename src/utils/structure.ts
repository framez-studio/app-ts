import { INode, IElement } from '@interfaces'
import { Element } from '@classes/complex-elements/element'
import { Structure } from '@classes/complex-elements/structure'
import { ElementNode } from '@classes/nodes/element-node'
import { Support } from '@classes/nodes/support'
import { Concrete } from '@classes/others/material'
import { RectangularSpanLoad } from '@classes/others/rectangular-span-load'
import { Concre21Props } from './material'
import { RectangularRCSection } from '@classes/sections/rectangular-cr'

export function generatePorticSystem(config: {
	levels: { quantity: number; separation: number }
	spans: { quantity: number; separation: number }
}) {
	const { levels, spans } = config
	const elements: IElement[] = []

	const nodes = generateNodes(spans, levels)
	const beams = generateBeams(spans, levels, nodes)
	const columns = generateColumns(spans, levels, nodes)

	elements.push(...beams, ...columns)

	const structure = new Structure(...elements)

	return { beams, columns, structure }
}

function generateNodes(
	spans: { quantity: number; separation: number },
	levels: { quantity: number; separation: number },
) {
	const nodes: INode[][] = []
	for (let i = 0; i <= levels.quantity; i++) {
		let level = []

		for (let j = 0; j <= spans.quantity; j++) {
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
	spans: { quantity: number; separation: number },
	levels: { quantity: number; separation: number },
	nodes: INode[][],
) {
	let columns = []
	for (let j = 0; j <= spans.quantity; j++) {
		for (let i = 0; i <= levels.quantity - 1; i++) {
			const { young, weight, fc, epsilon_max } = Concre21Props

			let material = new Concrete(
				'custom',
				fc,
				weight,
				young,
				epsilon_max,
			)
			let section = new RectangularRCSection(200, 200, material)

			let iNode = nodes[i][j]
			let fNode = nodes[i + 1][j]
			let element = new Element(iNode, fNode, section)
			element.setSpanLoad(new RectangularSpanLoad(element, 0))
			columns.push(element)
		}
	}
	return columns
}
function generateBeams(
	spans: { quantity: number; separation: number },
	levels: { quantity: number; separation: number },
	nodes: INode[][],
) {
	let beams = []
	for (let i = 1; i <= levels.quantity; i++) {
		for (let j = 0; j <= spans.quantity - 1; j++) {
			const { young, weight, fc, epsilon_max } = Concre21Props

			let material = new Concrete(
				'custom',
				fc,
				weight,
				young,
				epsilon_max,
			)
			let section = new RectangularRCSection(200, 200, material)

			let iNode = nodes[i][j]
			let fNode = nodes[i][j + 1]
			let element = new Element(iNode, fNode, section)
			element.setSpanLoad(new RectangularSpanLoad(element, 20))
			beams.push(element)
		}
	}
	return beams
}
