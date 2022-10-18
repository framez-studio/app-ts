import { describe, expect, it } from 'vitest'
import { HingedJoint } from '../entities/classes/nodes/hinged-joint'
import { degsOfFreedomBoolean2D } from '../entities/interfaces/nodes.interface'

describe('Hinged Joint', () => {
	const coordinates = { x: 4, y: 4 }
	const hingedJoint = new HingedJoint(coordinates)

	it(`should store correctly its coordinates`, () => {
		expect(hingedJoint.coordinates).toEqual(coordinates)
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
