import { degSlope, eucDistance } from '../../../utils/algebra'
import {
	degsOfFreedom2DArray,
	IElement,
} from '../../interfaces/element.interface'
import { IMatrix } from '../../interfaces/matrix.interface'
import { degsOfFreedomBoolean2D, INode } from '../../interfaces/nodes.interface'
import { coordinateSystem } from '../../interfaces/s-matrix.interface'
import { ISection } from '../../interfaces/section.interface'
import { SMatrix } from '../matrices/s-matrix'

export class Element implements IElement {
	private _nodes: { initial: INode; final: INode }
	private _releases: {
		initial: degsOfFreedomBoolean2D
		final: degsOfFreedomBoolean2D
	}
	public section: ISection
	public young: number

	constructor(iNode: INode, fNode: INode, section: ISection, young: number) {
		this.section = section
		this.young = young
		this._nodes = {
			initial: iNode,
			final: fNode,
		}
		this._releases = {
			initial: { dx: false, dy: false, rz: false },
			final: { dx: false, dy: false, rz: false },
		}
	}
	get constraints(): degsOfFreedom2DArray {
		return [
			...Object.values(this.nodes.initial.constraints),
			...Object.values(this.nodes.final.constraints),
		] as degsOfFreedom2DArray
	}
	get releases(): degsOfFreedom2DArray {
		return [
			...Object.values(this._releases.initial),
			...Object.values(this._releases.final),
		] as degsOfFreedom2DArray
	}
	get nodes(): { initial: INode; final: INode } {
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
