import { elementLoads2DArray, elementLoads2DObject, initialFinal } from '@types'
import { ISpanLoad } from '@interfaces'
import { rectangularLoadFef } from '@utils'

// TODO: throw error if distance is greater than elementLength
export class RectangularSpanLoad implements ISpanLoad {
	private load: number
	private elementLength: number
	private distance: initialFinal<number>

	constructor(
		load: number,
		elementLength: number,
		initial: number = 0,
		final: number = elementLength,
	) {
		this.load = load
		this.elementLength = elementLength
		this.distance = { initial, final }
	}
	get fef(): elementLoads2DObject {
		return rectangularLoadFef(
			this.load,
			this.elementLength,
			this.distance.initial,
			this.distance.final,
		)
	}
	get fefArray(): elementLoads2DArray {
		let fef = this.fef
		return [
			[fef.initial.fx],
			[fef.initial.fy],
			[fef.initial.mz],
			[fef.final.fx],
			[fef.final.fy],
			[fef.final.mz],
		]
	}
}
