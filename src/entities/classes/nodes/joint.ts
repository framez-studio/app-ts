import {
	coordinates2D,
	degsOfFreedomBoolean2D,
	IJoint,
} from '../../interfaces/nodes.interface'
import { ElementNode } from './element-node'

export class Joint extends ElementNode implements IJoint {
	public releases: degsOfFreedomBoolean2D

	constructor(coordinates: coordinates2D, releases: degsOfFreedomBoolean2D) {
		super(coordinates)
		this.releases = releases
	}
}
