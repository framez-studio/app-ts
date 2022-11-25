import { ISteelCircularSection, ISteel } from '@interfaces'

export class BarCR implements ISteelCircularSection {
	constructor(
		public diameter: number,
		public area: number,
		public material: ISteel,
	) {
		this.diameter = diameter
		this.material = material
		this.area = area
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
