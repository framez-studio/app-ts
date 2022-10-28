import { punctualLoadFef } from '../../../utils/fefs'
import { ISpanLoad } from '../../interfaces/span-load.interface'
import { Array2D, initialFinal, nodeLoads2DObject } from '../../types'

export class PunctualSpanLoad implements ISpanLoad {
	private load: number
	private elementLength: number
	private distance: number

	constructor(load: number, elementLength: number, distance: number) {
		this.load = load
		this.elementLength = elementLength
		this.distance = distance
	}
	get fef(): initialFinal<nodeLoads2DObject> {
		return punctualLoadFef(this.load, this.elementLength, this.distance)
	}
	get fefArray(): Array2D {
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
