import { rectangularLoadFef } from '../../../utils/fefs'
import { ISpanLoad } from '../../interfaces/span-load.interface'
import { Array2D, initialFinal, nodeLoads2DObject } from '../../types'

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
	get fef(): initialFinal<nodeLoads2DObject> {
		return rectangularLoadFef(
			this.load,
			this.elementLength,
			this.distance.initial,
			this.distance.final,
		)
	}
	get fefArray(): Array2D {
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
