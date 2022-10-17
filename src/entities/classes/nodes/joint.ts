import {
	coordinates2D,
	degsOfFreedomBoolean2D,
} from '../../interfaces/elementNode.interface'
import { ElementNode } from './elementNode'

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
