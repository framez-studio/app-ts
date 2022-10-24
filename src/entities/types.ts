export type coordinateSystem = 'local' | 'global'
export type coordinates2D = { x: number; y: number }

export type degsOfFreedom2D = 'dx' | 'dy' | 'rz'
export type degsOfFreedom2DBoolean = { [key in degsOfFreedom2D]: boolean }
export type degsOfFreedom2DArray = [
	boolean,
	boolean,
	boolean,
	boolean,
	boolean,
	boolean,
]

export type Array1D = number[]
export type Array2D = Array1D[]
