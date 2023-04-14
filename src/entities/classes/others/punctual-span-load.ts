import { elementLoads2DArray, elementLoads2DObject } from '@types'
import { IElement, ISpanLoad } from '@interfaces'
import { punctualLoadFef } from '@utils/fefs'

// TODO: throw error if distance is greater than elementLength
// This Class is experimental, its not ready yet to be used

export class PunctualSpanLoad implements ISpanLoad {
	public load: number
	private elementLength: number
	private distance: number

	constructor(load: number, elementLength: number, distance: number) {
		this.load = load
		this.elementLength = elementLength
		this.distance = distance
	}
	copy(_element: IElement): ISpanLoad {
		throw new Error('Method not implemented.')
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
