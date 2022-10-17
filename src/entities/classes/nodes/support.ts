import {
	coordinates2D,
	degsOfFreedomBoolean2D,
} from '../../interfaces/elementNode.interface'
import { ElementNode } from './elementNode'

export class Support extends ElementNode {
	constructor(
		coordinates: coordinates2D,
		restrictions: degsOfFreedomBoolean2D,
	) {
		super('support', coordinates, restrictions, {
			dx: false,
			dy: false,
			rz: false,
		})
	}
}
