import { Array2D, coordinates2D, supportType } from '@types'
import { IElement, INode } from '@interfaces'

export interface IStructure {
	readonly elements: IElement[]
	readonly nodes: INode[]
	readonly nodeLoads: Array2D
	readonly degsOfFreedom: boolean[]
	node(x: number, y: number): INode
	element(initial: coordinates2D, final: coordinates2D): IElement
	setSupport(x: number, y: number, type: supportType): void
	stiffness(type: 'full' | 'reduced'): Array2D
	fef(type: 'full' | 'reduced'): Array2D
	displacements(type: 'array' | 'object'): Array2D
}
