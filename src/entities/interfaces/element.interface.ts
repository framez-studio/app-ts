import {
	Array2D,
	coordinates2D,
	coordinateSystem,
	degsOfFreedom2DArray,
	initialOrFinal,
} from '../types'
import { INode } from './nodes.interface'
import { ISection } from './section.interface'

export interface IElement {
	readonly nodes: { initial: INode; final: INode }
	readonly length: number
	readonly inclination: number
	readonly releases: degsOfFreedom2DArray
	readonly constraints: degsOfFreedom2DArray
	young: number
	section: ISection
	stiffness(system: coordinateSystem): Array2D
	setNode(which: initialOrFinal, node: INode): void
	newConnectedElement(
		from: initialOrFinal,
		to: coordinates2D,
		section?: ISection,
		young?: number,
	): IElement
}
