import { gravity } from '@config/globals'
import { IBarCR, ISteel } from '@interfaces'
import { RoundFloor } from '@utils/algebra'

export class BarCR implements IBarCR {
	constructor(
		public diameter: number,
		public material: ISteel,
	) {
		this.diameter = diameter
		this.material = material
	}

	get area(){
		return RoundFloor(0.25 * Math.PI * (this.diameter) ** 2,6) 
	}

	get weight() {
		return this.material.weight * this.area
	}

	get mass() {
		return this.weight / gravity
	}

	get inertiaZ(): number {
		return 0.25 * Math.PI * (this.diameter * 0.5) ** 4
	}

	get young(): number {
		return this.material.young
	}

	get fy(): number {
		return this.material.fy
	}
}
