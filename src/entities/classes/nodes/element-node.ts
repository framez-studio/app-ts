import {
	coordinates2D,
	degsOfFreedomBoolean2D,
	INode,
} from '../../interfaces/nodes.interface'
import { Printable } from '../../interfaces/ui.interfaces'

export class ElementNode implements INode, Printable {
	public coordinates: coordinates2D
	public constraints: degsOfFreedomBoolean2D

	constructor(coordinates: coordinates2D) {
		this.coordinates = coordinates
		this.constraints = { dx: false, dy: false, rz: false }
	}
	printOnCanvas(context: CanvasRenderingContext2D): void {
		throw new Error('Method not implemented.')
	}
}
