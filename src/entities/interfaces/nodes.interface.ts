import {
	coordinates2D,
	degsOfFreedom2DBoolean,
	nodeDisplacements2DObject,
	nodeLoads2DObject,
} from '@types'
import { IElement, Resetable } from '@interfaces'
import { Element } from '../classes'

export interface INode extends Resetable {
	readonly loads: nodeLoads2DObject
	readonly displacements: nodeDisplacements2DObject
	readonly reactions: nodeLoads2DObject
	constraints: degsOfFreedom2DBoolean
	elements: IElement[] | undefined
	nodeMass: number
	connectElement(element: Element): void
	coordinates(state: 'static' | 'displaced'): coordinates2D
	setLoads(loads: Partial<nodeLoads2DObject>): void
	addLoads(loads: Partial<nodeLoads2DObject>): void
	setDisplacements(displacements: Partial<nodeDisplacements2DObject>): void
	addDisplacements(displacements: Partial<nodeDisplacements2DObject>): void
	setReactions(reactions: Partial<nodeLoads2DObject>): void
	isSupport(): boolean
}
