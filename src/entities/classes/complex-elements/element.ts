import {
	coordinateSystem,
	Array2D,
	degsOfFreedom2DBoolean,
	initialFinal,
	initialOrFinal,
	degsOfFreedom2DArray,
	elementLoads2DArray,
} from '@types'
import { IElement, INode, ISection, ISpanLoad } from '@interfaces'
import { defaultElementLoads, defaultElementReleases } from '@config'
import { degSlope, eucDistance } from '@utils'
import { MatrixGenerator as MatGen, SMatrixOperator as MatOp } from '@classes'

export class Element implements IElement {
	private _nodes: initialFinal<INode>
	private _releases: initialFinal<degsOfFreedom2DBoolean>
	private _loads: ISpanLoad[] = [...defaultElementLoads]
	public section: ISection
	public young: number

	constructor(iNode: INode, fNode: INode, section: ISection, young: number) {
		this.section = section
		this.young = young
		this._nodes = {
			initial: iNode,
			final: fNode,
		}
		this._releases = { ...defaultElementReleases }
	}
	get nodes(): initialFinal<INode> {
		return this._nodes
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
	get fef(): elementLoads2DArray {
		let loadsFef = this._loads.map((load) => {
			return load.fefArray
		})
		return MatOp.sum(...loadsFef) as elementLoads2DArray
	}
	public setNode(which: initialOrFinal, node: INode): void {
		this._nodes[which] = node
	}
	public setSpanLoad(load: ISpanLoad): void {
		this._loads = [load]
	}
	public addSpanLoad(load: ISpanLoad): void {
		this._loads.push(load)
	}
	public stiffness(system: coordinateSystem): Array2D {
		let angle = this.inclination
		let stiff: Array2D = MatGen.stiffness(
			this.young,
			this.length,
			this.section.area,
			this.section.inertiaZ,
			this.releases,
		)
		if (system === 'global' && angle !== 0) {
			stiff = MatOp.rotate(stiff, angle)
		}
		return stiff
	}
	public newConnectedElement(
		from: initialOrFinal,
		to: INode,
		section?: ISection | undefined,
		young?: number | undefined,
	): IElement {
		return new Element(
			this.nodes[from],
			to,
			section ?? this.section,
			young ?? this.young,
		)
	}
}
