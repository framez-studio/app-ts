export type nodeType = 'joint' | 'support'
export type coordinates2D = { x: number; y: number }
export type degsOfFreedom2D = 'dx' | 'dy' | 'rz'
export type degsOfFreedomBoolean2D = { [key in degsOfFreedom2D]: boolean }

export interface INode {
	coordinates: coordinates2D
}

export interface IJoint extends INode {
	releases: degsOfFreedomBoolean2D
}

export interface ISupport extends INode {
	restrictions: degsOfFreedomBoolean2D
}
