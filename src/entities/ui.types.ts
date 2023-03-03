import { IElement, INode, IUIElement, IUINode } from '@interfaces'
import { coordinates2D } from '@types'

export type IFormSections = 'properties' | 'loads' | 'response'
export type IUIObject = {
	readonly path: Path2D
}
export interface IUIStructureObject<T> extends IUIObject {
	readonly object: T
}
export type IUILayerType = 'nodes' | 'elements'
export type IUILayer = {
	name: IUILayerType
	elements: IUINode[] | IUIElement[]
}
export type IUISelection = { layer: IUILayerType | null; index: number | null }
export type ICanvasObjectType = 'node' | 'element'
export type ICanvasObjectMap<T extends ICanvasObjectType> = T extends 'node'
	? INode
	: T extends 'element'
	? IElement
	: T extends null
	? null
	: undefined
export type ICanvasObject<T extends ICanvasObjectType> = {
	type: T
	object: ICanvasObjectMap<T>
}

export type ICanvasPointer = {
	id: number
	coords: coordinates2D
}
export type IAppCanvasCamera = {
	dx: number
	dy: number
	scale: number
}
export type IGraphicStructure = {
	context: CanvasRenderingContext2D
	nodes: IUINode[]
	elements: IUIElement[]
}
