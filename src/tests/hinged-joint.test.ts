import { describe, expect, it } from 'vitest'
import { HingedJoint } from '../entities/classes/nodes/hingedJoint'
import { degsOfFreedomBoolean2D } from '../entities/interfaces/elementNode.interface'

describe('NodeElement Class and children', () => {
	const coordinates = { x: 4, y: 4 }
	const hingedJoint = new HingedJoint(coordinates)

	it('should allow movement in all joint instances', () => {
		const unrestricted: degsOfFreedomBoolean2D = {
			dx: false,
			dy: false,
			rz: false,
		}
		expect(hingedJoint.restrictions).toEqual(unrestricted)
	})
	it('should have release in rotation around z axis', () => {
		const released: degsOfFreedomBoolean2D = {
			dx: false,
			dy: false,
			rz: true,
		}
		expect(hingedJoint.releases).toEqual(released)
	})
})
