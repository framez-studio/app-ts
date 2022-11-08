import { IConcrete } from '@/entities/interfaces/material.interface'
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

export class Concrete implements IConcrete{
	constructor(
		private _name: string,			
		private _fc:number,	
		private _weight:number,
		private _young: number
	){}
	get fc(): number{
		return this._fc
	}
	get name(): string{
		return this._name
	}
	get young(): number{
		return this._young
	}
	get weight(): number{
		return this._weight
	}

}
