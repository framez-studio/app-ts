import { IElement, INode } from '@interfaces'
import { Concre21Props } from '@utils'
import {
	Concrete,
	Element,
	ElementNode,
	RectangularSpanLoad,
	Structure,
	Support,
} from '@classes'
import { RectangularRCSection } from '@/entities/classes/sections/rectangular-cr'

const levels = {
	quantity: 2,
	separation: 2,
}
const spans = {
	quantity: 2,
	separation: 2,
}
const nodes: INode[][] = []
const elements: IElement[] = []

// nodes generation
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
// beams generation
let beams = []
for (let i = 1; i <= levels.quantity; i++) {
	for (let j = 0; j <= spans.quantity - 1; j++) {
		const { young, weight, fc, epsilon_max } = Concre21Props

		let material = new Concrete('custom', fc, weight, young, epsilon_max)
		let section = new RectangularRCSection(200, 200, material)

		let iNode = nodes[i][j]
		let fNode = nodes[i][j + 1]
		let element = new Element(iNode, fNode, section)
		element.setSpanLoad(new RectangularSpanLoad(element, 0))
		beams.push(element)
	}
}
// columns generation
let columns = []
for (let j = 0; j <= spans.quantity; j++) {
	for (let i = 0; i <= levels.quantity - 1; i++) {
		const { young, weight, fc, epsilon_max } = Concre21Props

		let material = new Concrete('custom', fc, weight, young, epsilon_max)
		let section = new RectangularRCSection(200, 200, material)

		let iNode = nodes[i][j]
		let fNode = nodes[i + 1][j]
		let element = new Element(iNode, fNode, section)
		element.setSpanLoad(new RectangularSpanLoad(element, 0))
		columns.push(element)
	}
}
// structure instantiation
elements.push(...beams, ...columns)
export const structure = new Structure(...elements)
