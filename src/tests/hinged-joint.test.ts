import { describe, expect, it } from 'vitest'
import { ElementNode } from '../entities/classes/nodes/element-node'
import { HingedJoint } from '../entities/classes/nodes/hinged-joint'
import { degsOfFreedomBoolean2D } from '../entities/interfaces/nodes.interface'

describe('Hinged Joint', () => {
	const coordinates = { x: 4, y: 4 }
	const node = new ElementNode(coordinates)
	const hingedJoint = new HingedJoint(node)

	it(`should store correctly its coordinates`, () => {
		expect(hingedJoint.node.coordinates).toEqual(coordinates)
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
