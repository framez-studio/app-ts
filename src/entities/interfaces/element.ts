import { ElementNode } from '../classes/nodes/elementNode'
import { Section } from '../classes/sections/section'

export interface IElement {
	readonly nodes: { initial: ElementNode; final: ElementNode }
	readonly length: number
	readonly inclination: number
	young: number
	section: Section
}
