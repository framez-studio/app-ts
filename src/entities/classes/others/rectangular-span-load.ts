import { ISpanLoad } from '../../interfaces/span-load.interface'
import { initialFinal, nodeLoads2DObject } from '../../types'

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
		// primary vars
		let w = this.load
		let l = this.elementLength
		let a = this.distance.initial
		let b = this.distance.final
		// composite vars
		let wa4 = w * a ** 4
		let wb4 = w * b ** 4
		let l2 = l ** 2
		let l3 = l2 * l
		let l2wa2 = l2 * w * a ** 2
		let l2wb2 = l2 * w * b ** 2
		let lwa3 = l * w * a ** 3
		let lwb3 = l * w * b ** 3
		// moment resultants
		const m1 =
			-(3 * wa4 - 3 * wb4 + 6 * l2wa2 - 6 * l2wb2 - 8 * lwa3 + 8 * lwb3) /
			(12 * l2)
		const m2 = -(3 * wa4 - 3 * wb4 - 4 * lwa3 + 4 * lwb3) / (12 * l2)
		// force resultants
		const r1y =
			-(
				wa4 -
				wb4 -
				2 * lwa3 +
				2 * l3 * w * a +
				2 * lwb3 -
				2 * l3 * w * b
			) /
			(2 * l3)
		const r2y = (wa4 - wb4 - 2 * lwa3 + 2 * lwb3) / (2 * l3)
		// reactions
		const reactions: initialFinal<nodeLoads2DObject> = {
			initial: {
				fx: 0,
				fy: r1y,
				mz: m1,
			},
			final: {
				fx: 0,
				fy: r2y,
				mz: m2,
			},
		}
		return reactions
	}
}
