import { Array2D, coordinates2D, supportType } from '@types'
import { IElement, INode, IStructure } from '@interfaces'
import { constraints } from '@config'
import {
	allIndexesOf,
	assemblyMatrix,
	filterElementByCoords,
	filterNodeByCoords,
	uniques,
	assemblyFef,
	getStructureDisplacements,
} from '@utils'
import { SMatrixOperator as MatOp } from '@classes'

export class Structure implements IStructure {
	private _elements: IElement[]

	constructor(...elements: IElement[]) {
		this._elements = [...elements]
	}
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
	public node(x: number, y: number): INode {
		return filterNodeByCoords(this.nodes, x, y)
	}
	public element(initial: coordinates2D, final: coordinates2D): IElement {
		return filterElementByCoords(this.elements, initial, final)
	}
	public setSupport(x: number, y: number, type: supportType): void {
		this.node(x, y).constraints = constraints[type]
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
	public displacements(type: 'object' | 'array'): Array2D {
		return getStructureDisplacements(
			this.stiffness('full'),
			this.fef('full'),
			this.nodeLoads,
			this.constraints,
		)
	}
	private get constraints(): boolean[] {
		return this.nodes
			.map((node) => [
				node.constraints.dx,
				node.constraints.dy,
				node.constraints.rz,
			])
			.flat()
	}
}
