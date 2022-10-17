import { coordinates2D } from '../../interfaces/elementNode.interface'
import { ElementNode } from './elementNode'

export class FixedJoint extends ElementNode {
	constructor(coordinates: coordinates2D) {
		super(
			'joint',
			coordinates,
			{ dx: false, dy: false, rz: false },
			{ dx: false, dy: false, rz: false },
		)
	}
}
