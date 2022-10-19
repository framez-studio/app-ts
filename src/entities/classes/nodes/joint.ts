import { degsOfFreedomBoolean2D, INode } from '../../interfaces/nodes.interface'

export class Joint implements IJoint {
	public releases: degsOfFreedomBoolean2D
	private _node: INode

	constructor(node: INode, releases: degsOfFreedomBoolean2D) {
		this._node = node
		this.releases = releases
	}
	public get node(): INode {
		return this._node
	}
}
