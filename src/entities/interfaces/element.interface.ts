import {
	Array2D,
	coordinateSystem,
	degsOfFreedom2DArray,
	elementLoads2DArray,
	initialOrFinal,
} from '../types'
import { INode } from './nodes.interface'
import { ISection } from './section.interface'
import { ISpanLoad } from './span-load.interface'

export interface IElement {
	readonly nodes: { initial: INode; final: INode }
	readonly fef: elementLoads2DArray
	readonly length: number
	readonly inclination: number
	readonly releases: degsOfFreedom2DArray
	readonly constraints: degsOfFreedom2DArray
	young: number
	section: ISection
	setSpanLoad(load: ISpanLoad): void
	addSpanLoad(load: ISpanLoad): void
	stiffness(system: coordinateSystem): Array2D
	setNode(which: initialOrFinal, node: INode): void
	newConnectedElement(
		from: initialOrFinal,
		to: INode,
		section?: ISection,
		young?: number,
	): IElement
}
