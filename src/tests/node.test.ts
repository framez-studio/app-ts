import { describe, expect, it } from 'vitest'
import { ElementNode } from '@classes'

describe('ElementNode Class', () => {
	let coordinates = { x: 0, y: 2 }
	const node = new ElementNode(coordinates.x, coordinates.y)

	it('should store correctly its coordinates', () => {
		expect(node.coordinates).toEqual(coordinates)
	})
	it('should have default constraints set to false', () => {
		expect(node.constraints).toEqual({ dx: false, dy: false, rz: false })
	})
	it('should have default loads set to 0', () => {
		expect(node.loads).toEqual({ fx: 0, fy: 0, mz: 0 })
	})
	it('should allow to set loads to new value', () => {
		node.setLoad('fx', 50)
		node.setLoad('fx', 20)
		expect(node.loads.fx).toEqual(20)
	})
	it('should allow to add loads to previews values', () => {
		node.setLoad('fx', 50)
		node.addLoad('fx', 20)
		expect(node.loads.fx).toEqual(70)
	})
})
