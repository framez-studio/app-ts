import { describe, expect, it } from 'vitest'
import { FixedJoint } from '../entities/classes/nodes/fixed-joint'
import { degsOfFreedomBoolean2D } from '../entities/interfaces/nodes.interface'

describe('Fixed Joint', () => {
	const coordinates = { x: 4, y: 4 }
	const fixedJoint = new FixedJoint(coordinates)

	it(`should store correctly its coordinates`, () => {
		expect(fixedJoint.coordinates).toEqual(coordinates)
	})
	it(`should have not releases in any degree of freedom`, () => {
		const released: degsOfFreedomBoolean2D = {
			dx: false,
			dy: false,
			rz: false,
		}
		console.log(fixedJoint)
		expect(fixedJoint.releases).toEqual(released)
	})
})
