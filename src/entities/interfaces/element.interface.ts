import {
	Array2D,
	coordinateSystem,
	degsOfFreedom2D,
	degsOfFreedom2DArray,
	elementDegsOfFreedom2DObject,
	elementLoads2DArray,
	initialOrFinal,
} from '@types'
import { INode, ISection, ISpanLoad } from '@interfaces'

export interface IElement {
	readonly nodes: { initial: INode; final: INode }
	readonly length: number
	readonly inclination: number
	readonly releases: elementDegsOfFreedom2DObject
	readonly constraints: degsOfFreedom2DArray
	readonly reactions: elementLoads2DArray
	readonly forces: elementLoads2DArray
	young: number
	section: ISection
	release(node: initialOrFinal, direction: degsOfFreedom2D): void
	unrelease(node: initialOrFinal, direction: degsOfFreedom2D): void
	setSpanLoad(load: ISpanLoad): void
	addSpanLoad(load: ISpanLoad): void
	fef(system: coordinateSystem): elementLoads2DArray
	stiffness(system: coordinateSystem): Array2D
	setNode(which: initialOrFinal, node: INode): void
	newConnectedElement(
		from: initialOrFinal,
		to: INode,
		section?: ISection,
		young?: number,
	): IElement
}
