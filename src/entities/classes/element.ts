import { degSlope, eucDistance } from '../../utils/algebra'
import { IElement } from '../interfaces/element'
import { ElementNode } from './ElementNode'
import { Section } from './section'

export class Element implements IElement {
	private _nodes: { initial: ElementNode; final: ElementNode }

	constructor(
		iNode: ElementNode,
		fNode: ElementNode,
		public section: Section,
		public young: number,
	) {
		this._nodes = { initial: iNode, final: fNode }
	}
	get nodes(): { initial: ElementNode; final: ElementNode } {
		return this._nodes
	}
	get length(): number {
		return eucDistance(
			this._nodes.initial.coordinates,
			this._nodes.final.coordinates,
		)
	}
	get inclination(): number {
		return degSlope(
			this._nodes.initial.coordinates,
			this._nodes.final.coordinates,
		)
	}
}
