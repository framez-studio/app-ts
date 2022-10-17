import {
	coordinates2D,
	degsOfFreedomBoolean2D,
} from '../../interfaces/element-node.interface'
import { ElementNode } from './element-node'

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
