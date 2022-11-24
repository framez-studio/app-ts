export interface IMaterial {
	name: string
	young: number
	weight: number
}

export interface IConcrete extends IMaterial {
	fc: number
	beta: number
	epsilon_max: number
}

export interface ISteel extends IMaterial {
	fy: number;
}