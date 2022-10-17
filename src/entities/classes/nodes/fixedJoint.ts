import { coordinates2D } from '../../interfaces/elementNode.interface'
import { Joint } from './joint'

export class FixedJoint extends Joint {
	constructor(coordinates: coordinates2D) {
		super(coordinates, { dx: false, dy: false, rz: false })
	}
}
