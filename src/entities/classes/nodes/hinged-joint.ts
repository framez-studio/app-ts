import { coordinates2D } from '../../interfaces/element-node.interface'
import { Joint } from './joint'

export class HingedJoint extends Joint {
	constructor(coordinates: coordinates2D) {
		super(coordinates, { dx: false, dy: false, rz: true })
	}
}
