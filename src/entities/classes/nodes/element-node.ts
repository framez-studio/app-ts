import {
	coordinates2D,
	degsOfFreedomBoolean2D,
	IElementNode,
	nodeType,
} from '../../interfaces/element-node.interface'
import { Printable } from '../../interfaces/ui.interfaces'

export class ElementNode implements IElementNode, Printable {
	public type: nodeType
	public coordinates: coordinates2D
	public restrictions: degsOfFreedomBoolean2D
	public releases: degsOfFreedomBoolean2D

	constructor(
		type: nodeType,
		coordinates: coordinates2D,
		restrictions: degsOfFreedomBoolean2D,
		releases: degsOfFreedomBoolean2D,
	) {
		this.type = type
		this.coordinates = coordinates
		this.restrictions = restrictions
		this.releases = releases
	}
	printOnCanvas(context: CanvasRenderingContext2D): void {
		throw new Error('Method not implemented.')
	}
}