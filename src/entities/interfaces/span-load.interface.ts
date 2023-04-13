import { elementLoads2DArray, elementLoads2DObject } from '@types'
import { IElement } from './element.interface'

export interface ISpanLoad {
	load: number
	readonly fef: elementLoads2DObject
	readonly fefArray: elementLoads2DArray
	copy(element: IElement): ISpanLoad
}
