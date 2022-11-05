import {
	coordinates2D,
	degsOfFreedom2DBoolean,
	nodeLoads2D,
	nodeLoads2DObject,
} from '@types'

export interface INode {
	readonly loads: nodeLoads2DObject
	coordinates: coordinates2D
	constraints: degsOfFreedom2DBoolean
	setLoad(load: nodeLoads2D, value: number): void
	addLoad(load: nodeLoads2D, value: number): void
}
