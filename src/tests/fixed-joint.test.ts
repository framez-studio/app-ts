import { describe, expect, it } from 'vitest'
import { ElementNode } from '../entities/classes/nodes/element-node'
import { FixedJoint } from '../entities/classes/nodes/fixed-joint'
import { degsOfFreedomBoolean2D } from '../entities/interfaces/nodes.interface'

describe('Fixed Joint', () => {
	const coordinates = { x: 4, y: 4 }
	const node = new ElementNode(coordinates)
	const fixedJoint = new FixedJoint(node)

	it(`should store correctly its coordinates`, () => {
		expect(fixedJoint.node.coordinates).toEqual(coordinates)
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
