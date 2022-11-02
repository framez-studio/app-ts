import {
	assemblyMatrix,
	filterElementByCoords,
	filterNodeByCoords,
	uniques,
} from '../../../utils/elements'
import { constraints } from '../../globals'
import { IElement } from '../../interfaces/element.interface'
import { INode } from '../../interfaces/nodes.interface'
import { IStructure } from '../../interfaces/structure.interface'
import { Array2D, coordinates2D, supportType } from '../../types'

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
	public stiffness(): Array2D {
		return assemblyMatrix(this.nodes, this.elements)
	}
}
