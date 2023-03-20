import { INode, IElement } from '@interfaces'
import {
	Support,
	ElementNode,
	Element,
	Concrete,
	RectangularSectionCR,
	RectangularSpanLoad,
	Structure,
} from '@classes'
import { Concre21Props } from '@utils'

export function PorticSystemGenerator(config: {
	levels: { quantity: number; separation: number }
	spans: { quantity: number; separation: number }
}) {
	const { levels, spans } = config
	const nodes: INode[][] = []
	const elements: IElement[] = []

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

			let material = new Concrete(
				'custom',
				fc,
				weight,
				young,
				epsilon_max,
			)
			let section = new RectangularSectionCR(200, 200, material)

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

			let material = new Concrete(
				'custom',
				fc,
				weight,
				young,
				epsilon_max,
			)
			let section = new RectangularSectionCR(200, 200, material)

			let iNode = nodes[i][j]
			let fNode = nodes[i + 1][j]
			let element = new Element(iNode, fNode, section)
			element.setSpanLoad(new RectangularSpanLoad(element, 0))
			columns.push(element)
		}
	}
	elements.push(...beams, ...columns)
	const structure = new Structure(...elements)

	return { beams, columns, structure }
}
