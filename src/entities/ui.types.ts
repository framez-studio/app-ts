import { IElement, INode } from '@interfaces'
import { coordinates2D } from '@types'

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

export type ICanvasPointer = {
	id: number
	coords: coordinates2D
}
export type IAppCanvasInteraction = {
	isActive: boolean
	pointer: ICanvasPointer | null
	focus: coordinates2D
}
export type IAppCanvasCamera = {
	dx: number
	dy: number
	scale: number
}
