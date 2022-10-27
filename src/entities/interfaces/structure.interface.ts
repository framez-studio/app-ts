import { Array2D, coordinates2D, supportType } from '../types'
import { IElement } from './element.interface'
import { INode } from './nodes.interface'

export interface IStructure {
	readonly elements: IElement[]
	readonly nodes: INode[]
	node(x: number, y: number): INode
	element(initial: coordinates2D, final: coordinates2D): IElement
	setSupport(x: number, y: number, type: supportType): void
	stiffness(): Array2D
}
