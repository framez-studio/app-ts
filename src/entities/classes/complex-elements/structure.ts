import { uniques } from '../../../utils/elements'
import { IElement } from '../../interfaces/element.interface'
import { INode } from '../../interfaces/nodes.interface'
import { IStructure } from '../../interfaces/structure.interface'
import { Array2D } from '../../types'

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
		return uniques(...all)
	}
	stiffness(): Array2D {
		throw new Error('Method not implemented.')
	}
}
