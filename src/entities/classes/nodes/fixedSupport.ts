import { coordinates2D } from '../../interfaces/elementNode.interface'
import { ElementNode } from './elementNode'

export class FixedSupport extends ElementNode {
	constructor(coordinates: coordinates2D) {
		super(
			'support',
			coordinates,
			{ dx: true, dy: true, rz: true },
			{ dx: false, dy: false, rz: false },
		)
	}
}
