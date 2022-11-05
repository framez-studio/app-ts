import { IMaterial } from '@interfaces'

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
