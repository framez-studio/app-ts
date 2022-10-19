import { IJoint, INode } from '../../interfaces/nodes.interface'
import { Joint } from './joint'

export class FixedJoint extends Joint implements IJoint {
	constructor(node: INode) {
		super(node, { dx: false, dy: false, rz: false })
	}
}
