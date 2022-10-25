import { Array2D } from '../types'
import { IElement } from './element.interface'
import { INode } from './nodes.interface'

export interface IStructure {
	readonly elements: IElement[]
	readonly nodes: INode[]
	stiffness(): Array2D
}
