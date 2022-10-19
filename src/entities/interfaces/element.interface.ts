import { IMatrix } from './matrix.interface'
import { INode } from './nodes.interface'
import { coordinateSystem } from './s-matrix.interface'
import { ISection } from './section.interface'

export type degsOfFreedomArray = [
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
	readonly releases: degsOfFreedomArray
	readonly constraints: degsOfFreedomArray
	young: number
	section: ISection
	stiffness(system: coordinateSystem): IMatrix
}
