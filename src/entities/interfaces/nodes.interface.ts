import { coordinates2D, degsOfFreedom2DBoolean } from '../types'

export interface INode {
	coordinates: coordinates2D
	constraints: degsOfFreedom2DBoolean
}
