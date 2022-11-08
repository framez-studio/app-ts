export interface IMaterial {
	name: string
	young: number
	weight: number
}

export interface IConcrete extends IMaterial {
	fc: number
}

