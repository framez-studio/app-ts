export interface IMaterial {
	name: string
	young: number
	weight: number
}
export interface IConcreteProps {
	name: string
	fc: number
	weight: number
	young: number
	epsilon_max: number
}
export interface IConcrete extends IMaterial {
	fc: number
	beta: number
	epsilon_max: number
}

export interface ISteel extends IMaterial {
	fy: number
}

export type MaterialType = IConcrete | ISteel
