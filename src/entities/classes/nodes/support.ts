import {
	degsOfFreedomBoolean2D,
	INode,
	ISupport,
} from '../../interfaces/nodes.interface'

export class Support implements ISupport {
	public restrictions: degsOfFreedomBoolean2D
	private _node: INode

	constructor(node: INode, restrictions: degsOfFreedomBoolean2D) {
		this._node = node
		this.restrictions = restrictions
	}
	public get node(): INode {
		return this._node
	}
}
