import { coordinates2D } from '../../interfaces/nodes.interface'
import { Support } from './support'

export class FixedSupport extends Support {
	constructor(coordinates: coordinates2D) {
		super(coordinates, { dx: true, dy: true, rz: true })
	}
}
