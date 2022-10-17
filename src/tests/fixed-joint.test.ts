import { describe, expect, it } from 'vitest'
import { FixedJoint } from '../entities/classes/nodes/fixedJoint'
import { degsOfFreedomBoolean2D } from '../entities/interfaces/elementNode.interface'

describe('NodeElement Class and children', () => {
	const coordinates = { x: 4, y: 4 }
	const fixedJoint = new FixedJoint(coordinates)

	it('should allow movement in all joint instances', () => {
		const unrestricted: degsOfFreedomBoolean2D = {
			dx: false,
			dy: false,
			rz: false,
		}
		expect(fixedJoint.restrictions).toEqual(unrestricted)
	})
	it('should have not releases in any degree of freedom', () => {
		const released: degsOfFreedomBoolean2D = {
			dx: false,
			dy: false,
			rz: false,
		}
		expect(fixedJoint.releases).toEqual(released)
	})
})
