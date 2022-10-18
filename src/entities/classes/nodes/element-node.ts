import { coordinates2D, INode } from '../../interfaces/nodes.interface'
import { Printable } from '../../interfaces/ui.interfaces'

export class ElementNode implements INode, Printable {
	public coordinates: coordinates2D

	constructor(coordinates: coordinates2D) {
		this.coordinates = coordinates
	}
	printOnCanvas(context: CanvasRenderingContext2D): void {
		throw new Error('Method not implemented.')
	}
}
