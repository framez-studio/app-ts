export type nodeType = 'joint' | 'support'
export type coordinates2D = { x: number; y: number }

export interface IElementNode {
	type: nodeType
	coordinates: coordinates2D
	restrictions: { dx: boolean; dy: boolean; rz: boolean }
}
