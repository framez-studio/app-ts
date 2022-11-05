import {
	assemblyMatrix,
	filterElementByCoords,
	filterNodeByCoords,
} from '../../../utils/elements'
import { allIndexesOf, uniques } from '../../../utils/helpers'
import { constraints } from '../../globals'
import { IElement } from '../../interfaces/element.interface'
import { INode } from '../../interfaces/nodes.interface'
import { IStructure } from '../../interfaces/structure.interface'
import { Array2D, coordinates2D, supportType } from '../../types'
import { SMatrixOperator as MatOp } from '../matrices/s-matrix-operator'

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
	public node(x: number, y: number): INode {
		return filterNodeByCoords(this.nodes, x, y)
	}
	public element(initial: coordinates2D, final: coordinates2D): IElement {
		return filterElementByCoords(this.elements, initial, final)
	}
	public setSupport(x: number, y: number, type: supportType): void {
		this.node(x, y).constraints = constraints[type]
	}
	public stiffness(type: 'full' | 'reduced'): Array2D {
		let full = assemblyMatrix(this.nodes, this.elements)
		let lockedDegs = allIndexesOf(this.constraints, true)
		if (type === 'full') return full
		return MatOp.reduceDegs('matrix', full, ...lockedDegs)
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
