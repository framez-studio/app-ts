import { degSlope, eucDistance } from '../../../utils/algebra'
import { IElement } from '../../interfaces/element.interface'
import { IMatrix } from '../../interfaces/matrix.interface'
import { IJoint, ISupport } from '../../interfaces/nodes.interface'
import { coordinateSystem } from '../../interfaces/s-matrix.interface'
import { ISection } from '../../interfaces/section.interface'
import { Matrix } from '../matrices/matrix'
import { SMatrix } from '../matrices/s-matrix'

export class Element implements IElement {
	private _nodes: { initial: IJoint | ISupport; final: IJoint | ISupport }
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
		this._nodes = {
			initial: iNode,
			final: fNode,
		}
	}
	get nodes(): { initial: IJoint | ISupport; final: IJoint | ISupport } {
		return this._nodes
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
	stiffness(system: coordinateSystem): IMatrix {
		let matrix = new SMatrix(
			this.young,
			this.length,
			this.section.area,
			this.section.inertiaZ,
		)
		console.log(matrix)
		return matrix.full()
	}
}
