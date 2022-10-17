import { IElementNode, nodeType } from '../interfaces/elementNode.interface'
import { Printable } from '../interfaces/ui.interfaces'

export class ElementNode implements IElementNode, Printable {
	public coordinates: { x: number; y: number }

	constructor(
		public type: nodeType,
		x: number,
		y: number,
		public restrictions: {
			dx: boolean
			dy: boolean
			rz: boolean
		},
	) {
		this.coordinates = { x, y }
	}
	printOnCanvas(context: CanvasRenderingContext2D): void {
		throw new Error('Method not implemented.')
	}
}
