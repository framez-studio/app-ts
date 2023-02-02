import { ISpanLoad } from '@interfaces'
import {
	degsOfFreedom2DBoolean,
	initialFinal,
	nodeDisplacements2DObject,
	nodeLoads2DObject,
	supportsConstraints,
} from '@types'

export const constraints: supportsConstraints = {
	'simple-x': {
		dx: true,
		dy: false,
		rz: false,
	},
	'simple-y': {
		dx: false,
		dy: true,
		rz: false,
	},
	hinge: {
		dx: true,
		dy: true,
		rz: false,
	},
	fixed: {
		dx: true,
		dy: true,
		rz: true,
	},
}
export const defaultElementReleases: initialFinal<degsOfFreedom2DBoolean> = {
	initial: { dx: false, dy: false, rz: false },
	final: { dx: false, dy: false, rz: false },
}
export const defaultElementLoads: ISpanLoad[] = []
export const defaultNodeConstraints: degsOfFreedom2DBoolean = {
	dx: false,
	dy: false,
	rz: false,
}
export const defaultNodeLoads: nodeLoads2DObject = { fx: 0, fy: 0, mz: 0 }
export const defaultNodeDeformations: nodeDisplacements2DObject = {
	dx: 0,
	dy: 0,
	rz: 0,
}

export const gravity: number = 9.807