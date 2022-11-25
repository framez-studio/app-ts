import { Array2D, coordinates2D, supportType } from '@types'
import { IElement, INode } from '@interfaces'

export interface IStructure {
	readonly elements: IElement[]
	readonly nodes: INode[]
	readonly nodeLoads: Array2D
	readonly degsOfFreedom: boolean[]
	readonly constraints: boolean[]
	readonly displacements: Array2D
	node(position: coordinates2D): INode
	element(initial: coordinates2D, final: coordinates2D): IElement
	setSupport(position: coordinates2D, type: supportType): void
	stiffness(type: 'full' | 'reduced'): Array2D
	fef(type: 'full' | 'reduced'): Array2D
}
