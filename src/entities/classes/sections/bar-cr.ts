import { gravity } from '@/config'
import { IBarCR, ISteel } from '@interfaces'

export class BarCR implements IBarCR {
	constructor(
		public diameter: number,
		public area: number,
		public material: ISteel,
	) {
		this.diameter = diameter
		this.material = material
		this.area = area
	}

	get weight(){
		return this.material.weight * this.area
	}

	get mass(){
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
