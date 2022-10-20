import { IMatrix } from './matrix.interface'
import { INode } from './nodes.interface'
import { coordinateSystem } from './s-matrix.interface'
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
	stiffness(system: coordinateSystem): IMatrix
}
