import {
	coordinateSystem,
	Array2D,
	degsOfFreedom2DBoolean,
	initialFinal,
	initialOrFinal,
	degsOfFreedom2DArray,
	elementLoads2DArray,
	degsOfFreedom2D,
	elementDegsOfFreedom2DObject,
} from '@types'
import { IElement, INode, ISection, ISpanLoad } from '@interfaces'
import { defaultElementLoads, defaultElementReleases } from '@config'
import {
	degSlope,
	eucDistance,
	elementLocalDisplacementsArray,
	releasesArray,
} from '@utils'
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
	get releases(): elementDegsOfFreedom2DObject {
		return this._releases
	}
	get length(): number {
		return eucDistance(
			this._nodes.initial.coordinates('static'),
			this._nodes.final.coordinates('static'),
		)
	}
	get inclination(): number {
		return degSlope(
			this._nodes.initial.coordinates('static'),
			this._nodes.final.coordinates('static'),
		)
	}
	get reactions(): elementLoads2DArray {
		let displacements = elementLocalDisplacementsArray(this)
		return MatOp.multiply(
			this.stiffness('local'),
			displacements,
		) as elementLoads2DArray
	}
	get forces(): elementLoads2DArray {
		let resultants = MatOp.sum(
			this.fef('local'),
			this.reactions,
		) as elementLoads2DArray
		return [
			[-resultants[0][0]],
			[+resultants[1][0]],
			[-resultants[2][0]],
			[+resultants[3][0]],
			[-resultants[4][0]],
			[+resultants[5][0]],
		]
	}
	public release(node: initialOrFinal, direction: degsOfFreedom2D): void {
		this._releases[node][direction] = true
	}
	public unrelease(node: initialOrFinal, direction: degsOfFreedom2D): void {
		this._releases[node][direction] = false
	}
	public fef(type: coordinateSystem): elementLoads2DArray {
		let loadsFef = this._loads.map((load) => load.fefArray)
		if (loadsFef.length == 0) return [[0], [0], [0], [0], [0], [0]]
		let local = MatOp.sum(...loadsFef) as elementLoads2DArray
		if (type == 'local') return local
		let angle = this.inclination
		return MatOp.rotateVector(local, angle) as elementLoads2DArray
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
		let releases = releasesArray(this.releases)
		let stiff: Array2D = MatGen.stiffness(
			this.young,
			this.length,
			this.section.area,
			this.section.inertiaZ,
			releases,
		)
		if (system === 'global' && angle !== 0) {
			stiff = MatOp.rotateMatrix(stiff, angle)
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
