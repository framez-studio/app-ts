import {
	coordinates2D,
	degsOfFreedomBoolean2D,
	ISupport,
} from '../../interfaces/nodes.interface'
import { ElementNode } from './element-node'

export class Support extends ElementNode implements ISupport {
	public restrictions: degsOfFreedomBoolean2D

	constructor(
		coordinates: coordinates2D,
		restrictions: degsOfFreedomBoolean2D,
	) {
		super(coordinates)
		this.restrictions = restrictions
	}
}
