import { ElementNode } from '../classes/ElementNode'
import { Section } from '../classes/section'

export interface IElement {
	readonly nodes: { initial: ElementNode; final: ElementNode }
	readonly length: number
	readonly inclination: number
	young: number
	section: Section
}
