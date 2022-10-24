import { Array2D, coordinateSystem } from '../types'
import { INode } from './nodes.interface'
import { ISection } from './section.interface'

export type degsOfFreedom2DArray = [
	boolean,
	boolean,
	boolean,
	boolean,
	boolean,
	boolean,
]

export interface IElement {
	readonly nodes: { initial: INode; final: INode }
	readonly length: number
	readonly inclination: number
	readonly releases: degsOfFreedom2DArray
	readonly constraints: degsOfFreedom2DArray
	young: number
	section: ISection
	stiffness(system: coordinateSystem): Array2D
}
