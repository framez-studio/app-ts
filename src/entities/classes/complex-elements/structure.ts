import {
	filterElementByCoords,
	filterNodeByCoords,
	uniques,
} from '../../../utils/elements'
import { IElement } from '../../interfaces/element.interface'
import { INode } from '../../interfaces/nodes.interface'
import { IStructure } from '../../interfaces/structure.interface'
import { Array2D, coordinates2D } from '../../types'

export class Structure implements IStructure {
	private _elements: IElement[]

	constructor(...elements: IElement[]) {
		this._elements = [...elements]
	}
	element(initial: coordinates2D, final: coordinates2D): IElement {
		return filterElementByCoords(this.elements, initial, final)
	}
	get elements(): IElement[] {
		return this._elements
	}
	get nodes(): INode[] {
		let all = this.elements
			.map((element) => [element.nodes.initial, element.nodes.final])
			.flat()
		return uniques(...all)
	}
	public node(x: number, y: number): INode {
		return filterNodeByCoords(this.nodes, x, y)
	}
	public stiffness(): Array2D {
		throw new Error('Method not implemented.')
	}
}
