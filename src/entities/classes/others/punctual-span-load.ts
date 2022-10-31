import { punctualLoadFef } from '../../../utils/fefs'
import { ISpanLoad } from '../../interfaces/span-load.interface'
import { elementLoads2DArray, elementLoads2DObject } from '../../types'

export class PunctualSpanLoad implements ISpanLoad {
	private load: number
	private elementLength: number
	private distance: number

	constructor(load: number, elementLength: number, distance: number) {
		this.load = load
		this.elementLength = elementLength
		this.distance = distance
	}
	get fef(): elementLoads2DObject {
		return punctualLoadFef(this.load, this.elementLength, this.distance)
	}
	get fefArray(): elementLoads2DArray {
		return [
			[this.fef.initial.fx],
			[this.fef.initial.fy],
			[this.fef.initial.mz],
			[this.fef.final.fx],
			[this.fef.final.fy],
			[this.fef.final.mz],
		]
	}
}
