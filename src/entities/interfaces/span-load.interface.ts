import { Array2D, initialFinal, nodeLoads2DObject } from '../types'

export interface ISpanLoad {
	readonly fef: initialFinal<nodeLoads2DObject>
	readonly fefArray: Array2D
}
