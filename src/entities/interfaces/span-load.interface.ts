import { elementLoads2DArray, elementLoads2DObject } from '@types'

export interface ISpanLoad {
	load: number
	readonly fef: elementLoads2DObject
	readonly fefArray: elementLoads2DArray
}
