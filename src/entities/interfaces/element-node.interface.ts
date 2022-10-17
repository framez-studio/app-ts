export type nodeType = 'joint' | 'support'
export type coordinates2D = { x: number; y: number }
export type degsOfFreedomBoolean2D = { dx: boolean; dy: boolean; rz: boolean }

export interface IElementNode {
	type: nodeType
	coordinates: coordinates2D
	restrictions: degsOfFreedomBoolean2D
	releases: degsOfFreedomBoolean2D
}
