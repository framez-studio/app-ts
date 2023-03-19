import {
	Array2D,
	coordinateSystem,
	degsOfFreedom2D,
	degsOfFreedom2DArray,
	elementDegsOfFreedom2DObject,
	elementLoads2DArray,
	initialOrFinal,
} from '@types'
import { INode, IRectangularRCSection, ISpanLoad } from '@interfaces'
import { Hinge } from '../classes/others/moment-curvature'

export interface IElement {
	readonly nodes: { initial: INode; final: INode }
	readonly length: number
	readonly inclination: number
	readonly releases: elementDegsOfFreedom2DObject
	readonly constraints: degsOfFreedom2DArray
	readonly reactions: elementLoads2DArray
	readonly forces: elementLoads2DArray
	readonly loads: ISpanLoad[]
	young: number
	section: IRectangularRCSection
	initialHinge: Hinge | undefined
	finalHinge: Hinge | undefined
	weigth: number
	mass: number
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
		section?: IRectangularRCSection,
		young?: number,
	): IElement
	getHinge(node: initialOrFinal): Hinge | undefined
}
