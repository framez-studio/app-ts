import { IElement, INode } from '@interfaces'

export type IFormSections = 'properties' | 'loads' | 'response'
export type IPathObject<T> = { object: T; path: Path2D }

export type IPathNode = IPathObject<INode>
export type IPathElement = IPathObject<IElement>

export type ICanvasObjectType = 'node' | 'element'
export type ICanvasObjectMap<T extends ICanvasObjectType> = T extends 'node'
	? INode
	: T extends 'element'
	? IElement
	: any
export type ICanvasObject<T extends ICanvasObjectType> = {
	type: T
	object: ICanvasObjectMap<T>
}
