import { ISpanLoad } from '../../interfaces/span-load.interface'
import { initialFinal, nodeLoads2DObject } from '../../types'

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
		// primary vars
		let w = this.load
		let l = this.elementLength
		let a = this.distance
		// composite vars
		let l2 = l ** 2
		let l3 = l * l2
		// moment resultants
		let m1 = (w * a * (l - a) ** 2) / l2
		let m2 = -(w * a ** 2 * (l - a)) / l2
		// force resultants
		let r1y = (w * (l - a) ** 2 * (l + 2 * a)) / l3
		let r2y = (w * a ** 2 * (3 * l - 2 * a)) / l3
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
