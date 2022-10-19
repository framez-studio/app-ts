import { INode, ISupport } from '../../interfaces/nodes.interface'
import { Support } from './support'

export class FixedSupport extends Support implements ISupport {
	constructor(node: INode) {
		super(node, { dx: true, dy: true, rz: true })
	}
}
