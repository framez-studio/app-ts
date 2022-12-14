import { IMaterial } from '@interfaces'
import { Section } from '@classes'

export class RectangularHSection extends Section {
	constructor(
		public b: number,
		private h: number,
		private bt: number,
		private ht: number,
		public material: IMaterial,
	) {
		super(material)
	}

	get area(): number {
		return this.b * this.h - (this.b - 2 * this.bt) * (this.h - 2 * this.ht)
	}
	get inertiaZ(): number {
		return (
			this.b * this.h ** 3 * (1 / 12) -
			(this.b - 2 * this.bt) * (this.h - 2 * this.ht) ** 3 * (1 / 12)
		)
	}
}
