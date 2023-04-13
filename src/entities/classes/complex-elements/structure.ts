import { constraints } from '@config/globals'
import { IStructure, IElement, INode } from '@interfaces'
import { Array2D, coordinates2D, supportType } from '@types'
import {
	displaceStructure,
	filterNodeByCoords,
	filterElementByCoords,
	assemblyFef,
	assemblyMatrix,
} from '@utils/elements'
import { uniques, allIndexesOf } from '@utils/helpers'
import { SMatrixOperator as MatOp } from '@classes/matrices/s-matrix-operator'

/**
 * Class structure return structure class
 */
export class Structure implements IStructure {
	protected _elements: IElement[]

	constructor(...elements: IElement[]) {
		this._elements = [...elements]
	}
	/**
	 *
	 */
	get elements(): IElement[] {
		return this._elements
	}
	get nodes(): INode[] {
		let all = this.elements
			.map((element) => [element.nodes.initial, element.nodes.final])
			.flat()
		let filtered = uniques(...all)
		return filtered
	}
	get nodeLoads(): Array2D {
		let arr: Array2D = []
		this.nodes.forEach((node) => {
			arr.push([node.loads.fx], [node.loads.fy], [node.loads.mz])
		})
		return arr
	}
	get degsOfFreedom(): boolean[] {
		return [true, true]
	}
	get displacements(): Array2D {
		return displaceStructure(this)
	}
	get constraints(): boolean[] {
		return this.nodes
			.map((node) => [
				node.constraints.dx,
				node.constraints.dy,
				node.constraints.rz,
			])
			.flat()
	}
	public node(position: coordinates2D): INode {
		return filterNodeByCoords(this.nodes, position.x, position.y)
	}
	public element(initial: coordinates2D, final: coordinates2D): IElement {
		return filterElementByCoords(this.elements, initial, final)
	}
	public setSupport(position: coordinates2D, type: supportType): void {
		this.node(position).constraints = constraints[type]
	}
	public fef(type: 'full' | 'reduced'): Array2D {
		let full = assemblyFef(this.nodes, this.elements)
		let lockedDegs = allIndexesOf(this.constraints, true)
		if (type === 'full') return full
		return MatOp.reduceDegs('vector', full, ...lockedDegs)
	}
	public stiffness(type: 'full' | 'reduced'): Array2D {
		let full = assemblyMatrix(this.nodes, this.elements)
		let lockedDegs = allIndexesOf(this.constraints, true)
		if (type === 'full') return full
		return MatOp.reduceDegs('matrix', full, ...lockedDegs)
	}

	public filterNodes(y?: number, x?: number) {
		let r = this.nodes
		if (y != undefined) {
			r = r.filter((node) => node.coordinates('static').y == y)
		}
		if (x != undefined) {
			r = r.filter((node) => node.coordinates('static').x == x)
		}
		return r
	}

	public resetLoadstoZero() {
		this._elements.forEach((element) => {
			element.resetLoads()
		})
		this.nodes.forEach((node) => {
			node.setLoads({ fx: 0, fy: 0, mz: 0 })
		})
	}

	public resetHingesStatus() {
		this._elements.forEach((element) => {
			element.initialHinge?.resetHinge
			element.finalHinge?.resetHinge
		})
	}

	public copy(): IStructure {
		let eArray = [] as IElement[]
		let nodesNew: INode[] = []
		this.nodes.forEach((n) => {
			nodesNew.push(n.copy())
		})

		this._elements.forEach((e) => {
			let ni = findNodeinArrayByCoordinates(
				e.nodes.initial.coordinates('static'),
				nodesNew,
			)
			let nf = findNodeinArrayByCoordinates(
				e.nodes.final.coordinates('static'),
				nodesNew,
			)
			let e2 = e.copy(ni, nf)
			e.loads.forEach((l) => {
				l.copy(e2)
			})
			eArray.push(e2)
		})
		return new Structure(...eArray)
	}

	public unReleaseAll(): void {
		this.elements.forEach((e) => {
			e.unrelease('initial', 'rz')
			e.unrelease('initial', 'dx')
			e.unrelease('initial', 'dy')
			e.unrelease('final', 'rz')
			e.unrelease('final', 'dx')
			e.unrelease('final', 'dy')
		})
	}
}

export const findNodeinArrayByCoordinates = (
	coordinates2D: coordinates2D,
	array: INode[],
) => {
	let nf: INode
	array.forEach((n) => {
		if (
			n.coordinates('static').x == coordinates2D.x &&
			n.coordinates('static').y == coordinates2D.y
		) {
			nf = n
		}
	})
	return nf!
}
