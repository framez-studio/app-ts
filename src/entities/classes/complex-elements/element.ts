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
import { IElement, INode, IRectangularRCSection, ISpanLoad } from '@interfaces'
import { MatrixGenerator as MatGen } from '@classes/matrices/matrix-generator'
import { SMatrixOperator as MatOp } from '@classes/matrices/s-matrix-operator'
import { Hinge } from '../others/moment-curvature'
import { defaultElementLoads, defaultElementReleases } from '@config/globals'
import { eucDistance, degSlope } from '@utils/algebra'
import { elementLocalDisplacementsArray, releasesArray } from '@utils/elements'
import clone from 'just-clone'
import { IHinge } from '@interfaces/hinge.interface'

export class Element implements IElement {
	private _nodes: initialFinal<INode>
	private _releases: initialFinal<degsOfFreedom2DBoolean>
	private _loads: ISpanLoad[] = [...defaultElementLoads]
	public section: IRectangularRCSection
	public initialHinge!: IHinge | undefined
	public finalHinge!: IHinge | undefined

	constructor(iNode: INode, fNode: INode, section: IRectangularRCSection) {
		this.section = section
		this._nodes = {
			initial: iNode,
			final: fNode,
		}
		this._releases = clone(defaultElementReleases)
		iNode.connectElement(this)
		fNode.connectElement(this)
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
	get young(): number {
		return this.section.material.young
	}
	set young(value: number) {
		this.section.material.young = value
	}
	/**
	 * Returns the inclination of the current element in degrees
	 * @readonly
	 * @type {number}
	 * @memberof Element
	 */
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

	get weigth(): number {
		return this.section.weight * this.length
	}

	get mass(): number {
		return this.section.mass * this.length
	}
	get loads(): ISpanLoad[] {
		return this._loads
	}
	public release(node: initialOrFinal, direction: degsOfFreedom2D): void {
		this._releases[node][direction] = true
	}
	public unrelease(node: initialOrFinal, direction: degsOfFreedom2D): void {
		this._releases[node][direction] = false
	}
	public fef(type: coordinateSystem): elementLoads2DArray {
		let loadsFef = this.loads.map((load) => load.fefArray)
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
		this.loads.push(load)
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
		section?: IRectangularRCSection,
	): IElement {
		return new Element(this.nodes[from], to, section ?? this.section)
	}

	public assignHinge(node: initialOrFinal, hinge: IHinge) {
		if (node == 'initial') {
			this.initialHinge = hinge
		} else {
			this.finalHinge = hinge
		}
	}

	public getHinge(node: initialOrFinal) {
		if (node == 'initial') {
			return this.initialHinge
		} else {
			return this.finalHinge
		}
	}
	public resetLoads(): void {
		this._loads = [...defaultElementLoads]
	}

	public copy(): IElement {
		let e = new Element(this.nodes.initial.copy(),this.nodes.final.copy(),this.section.copy())
		this._loads.forEach(l => {
			e.addSpanLoad(l)
		});
		let hi = this.getHinge('initial')
		let hf = this.getHinge('final')
		if (hi!=undefined) {
			e.assignHinge('initial',hi.copy())
		}
		if (hf!=undefined) {
			e.assignHinge('final',hf.copy())
		}

		return e
	}
}
