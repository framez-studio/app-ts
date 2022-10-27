import { supportsConstraints } from './types'

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
