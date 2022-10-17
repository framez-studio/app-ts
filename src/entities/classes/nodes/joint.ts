import {
	coordinates2D,
	degsOfFreedomBoolean2D,
} from '../../interfaces/element-node.interface'
import { ElementNode } from './element-node'

export class Joint extends ElementNode {
	constructor(coordinates: coordinates2D, releases: degsOfFreedomBoolean2D) {
		super(
			'joint',
			coordinates,
			{ dx: false, dy: false, rz: false },
			releases,
		)
	}
}
