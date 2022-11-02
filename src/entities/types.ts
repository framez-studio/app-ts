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
export type Array2D = number[][]

export type nodeLoads2D = 'fx' | 'fy' | 'mz'
export type nodeLoads2DObject = { [key in nodeLoads2D]: number }

export type initialOrFinal = 'initial' | 'final'
export type initialFinal<T> = { [key in initialOrFinal]: T }

export type supportType = 'simple-x' | 'simple-y' | 'hinge' | 'fixed'
export type supportsConstraints = {
	[key in supportType]: { [key in degsOfFreedom2D]: boolean }
}

export type elementLoads2DObject = initialFinal<nodeLoads2DObject>
export type elementLoads2DArray = [
	[number],
	[number],
	[number],
	[number],
	[number],
	[number],
]

export type stiffnessSubmatrices2DObject = {
	ii: Array2D
	ij: Array2D
	ji: Array2D
	jj: Array2D
}
