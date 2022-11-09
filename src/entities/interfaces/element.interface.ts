import {
	Array2D,
	coordinateSystem,
	degsOfFreedom2DArray,
	elementLoads2DArray,
	initialOrFinal,
} from '@types'
import { INode, ISection, ISpanLoad } from '@interfaces'

export interface IElement {
	readonly nodes: { initial: INode; final: INode }
	readonly length: number
	readonly inclination: number
	readonly releases: degsOfFreedom2DArray
	readonly constraints: degsOfFreedom2DArray
	young: number
	section: ISection
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
