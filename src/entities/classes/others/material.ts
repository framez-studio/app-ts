import { IConcrete, IMaterial, ISteel } from '@interfaces'

export class Material implements IMaterial {
	public name: string
	public young: number
	public weight: number

	constructor(name: string, young: number, weight: number) {
		this.name = name
		this.young = young
		this.weight = weight
	}
}

export class Concrete implements IConcrete {
	constructor(
		public name: string,
		public fc: number,
		public weight: number,
		public young: number,
		public epsilon_max: number,
	) {}

	get beta(): number {
		return this.fc / 1000 <= 28
			? 0.85
			: 0.85 - (0.05 * (this.fc / 1000 - 28)) / 7
	}

	copy(): IConcrete {
		let c = new Concrete(
			this.name,
			this.fc,
			this.weight,
			this.young,
			this.epsilon_max,
		)
		return c
	}
}

export class Steel implements ISteel {
	constructor(
		public name: string,
		public young: number,
		public weight: number,
		public fy: number,
	) {
		this.young = young
		this.fy = fy
		this.name = name
		this.weight = weight
	}

	get epsilonY() {
		return this.fy / this.young
	}

	copy(): ISteel {
		return new Steel(this.name, this.young, this.weight, this.fy)
	}
}
