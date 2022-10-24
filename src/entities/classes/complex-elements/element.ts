import { degSlope, eucDistance } from '../../../utils/algebra'
import {
	degsOfFreedom2DArray,
	IElement,
} from '../../interfaces/element.interface'
import { IMatrixGenerator } from '../../interfaces/matrix-generator.interface'
import { ISMatrixOperator } from '../../interfaces/matrix-operator.interface'
import { INode } from '../../interfaces/nodes.interface'
import { ISection } from '../../interfaces/section.interface'
import { coordinateSystem, Array2D, degsOfFreedom2DBoolean } from '../../types'
import { MatrixGenerator } from '../matrices/matrix-generator'
import { SMatrixOperator } from '../matrices/s-matrix-operator'

export class Element implements IElement {
	private _nodes: { initial: INode; final: INode }
	private _releases: {
		initial: degsOfFreedom2DBoolean
		final: degsOfFreedom2DBoolean
	}
	private matOp: ISMatrixOperator = new SMatrixOperator()
	private matGen: IMatrixGenerator = new MatrixGenerator()
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
	public stiffness(system: coordinateSystem): Array2D {
		let angle = this.inclination
		let stiff: Array2D = this.matGen.stiffness(
			this.young,
			this.length,
			this.section.area,
			this.section.inertiaZ,
			this.releases,
		)
		if (system === 'global' && angle !== 0) {
			stiff = this.matOp.rotate(stiff, angle)
		}
		return stiff
	}
}
