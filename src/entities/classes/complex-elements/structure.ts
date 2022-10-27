import { uniques } from '../../../utils/elements'
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
		let element = this.elements.filter((ielement) => {
			return (
				ielement.nodes.initial.coordinates.x === initial.x &&
				ielement.nodes.initial.coordinates.y === initial.y &&
				ielement.nodes.final.coordinates.x === final.x &&
				ielement.nodes.final.coordinates.y === final.y
			)
		})
		if (!element[0])
			throw new Error(
				`Element with coordinates [${initial.x},${initial.y}], [${final.x},${final.y}] doesn't exist on structure`,
			)
		return element[0]
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
		let node = this.nodes.filter((inode) => {
			return inode.coordinates.x === x && inode.coordinates.y === y
		})
		if (!node[0])
			throw new Error(
				`Node with coordinates ${x},${y} doesn't exist on structure`,
			)
		return node[0]
	}
	public stiffness(): Array2D {
		throw new Error('Method not implemented.')
	}
}
