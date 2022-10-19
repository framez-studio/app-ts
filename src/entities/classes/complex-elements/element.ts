import { degSlope, eucDistance } from '../../../utils/algebra'
import { transformation } from '../../../utils/matrices'
import { IElement } from '../../interfaces/element.interface'
import { IMatrix } from '../../interfaces/matrix.interface'
import { IJoint, INode, ISupport } from '../../interfaces/nodes.interface'
import { coordinateSystem } from '../../interfaces/s-matrix.interface'
import { ISection } from '../../interfaces/section.interface'
import { Matrix } from '../matrices/matrix'
import { SMatrix } from '../matrices/s-matrix'

export class Element implements IElement {
	private _connections: {
		initial: IJoint | ISupport
		final: IJoint | ISupport
	}
	private _nodes: { initial: INode; final: INode }
	public section: ISection
	public young: number

	constructor(
		iNode: IJoint | ISupport,
		fNode: IJoint | ISupport,
		section: ISection,
		young: number,
	) {
		this.section = section
		this.young = young
		this._connections = {
			initial: iNode,
			final: fNode,
		}
		this._nodes = {
			initial: iNode.node,
			final: fNode.node,
		}
	}
	get nodes(): { initial: IJoint | ISupport; final: IJoint | ISupport } {
		return this._connections
	}
	get length(): number {
		return eucDistance(
			this._nodes.initial.coordinates,
			this._nodes.final.coordinates,
		)
	}
	get inclination(): number {
		return degSlope(
			this._nodes.initial.coordinates,
			this._nodes.final.coordinates,
		)
	}
	public stiffness(system: coordinateSystem): IMatrix {
		const matrix = new SMatrix(
			this.young,
			this.length,
			this.section.area,
			this.section.inertiaZ,
		)
		let angle = this.inclination
		if (system === 'local' || angle === 0) return matrix.full()
		return matrix.toGlobal(angle)
	}
}
