import { ElementNode } from '@classes/nodes/element-node'
import { describe, expect, it } from 'vitest'

describe('ElementNode Class', () => {
	let coordinates = { x: 0, y: 2 }
	let firstDisplacements = { dx: 0.5, dy: 0, rz: -0.5 }
	let secondDisplacements = { dy: 0.6 }
	const node = new ElementNode(coordinates)

	it('should store correctly its coordinates', () => {
		expect(node.coordinates('static')).toEqual(coordinates)
	})
	it('should have default constraints set to false', () => {
		expect(node.constraints).toEqual({ dx: false, dy: false, rz: false })
	})
	it('should have default loads set to 0', () => {
		expect(node.loads).toEqual({ fx: 0, fy: 0, mz: 0 })
	})
	it('should allow to set loads to new value', () => {
		node.setLoads({ fx: 50, fy: 50 })
		node.setLoads({ fx: 20 })
		expect(node.loads.fx).toEqual(20)
		expect(node.loads.fy).toEqual(50)
	})
	it('should allow to add loads to previews values', () => {
		node.setLoads({ fx: 50, fy: 40 })
		node.addLoads({ fx: 20 })
		expect(node.loads.fx).toEqual(70)
		expect(node.loads.fy).toEqual(40)
	})
	it(`should have default displacements equal to 0`, () => {
		let expected = { dx: 0, dy: 0, rz: 0 }
		expect(node.displacements).toEqual(expected)
	})
	it(`should allow to set multiple displacements at once`, () => {
		let expected = { ...firstDisplacements }
		node.setDisplacements(firstDisplacements)
		expect(node.displacements).toEqual(expected)
	})
	it(`should allow to add multiple displacements at once`, () => {
		let expected = { dx: 1, dy: 0, rz: -1 }
		node.addDisplacements(firstDisplacements)
		expect(node.displacements).toEqual(expected)
	})
	it(`should allow to add only one displacement`, () => {
		let expected = { dx: 1, dy: 0.6, rz: -1 }
		node.addDisplacements(secondDisplacements)
		expect(node.displacements).toEqual(expected)
	})
	it(`should return correctly its displaced coordinates`, () => {
		let expected = { x: 1, y: 2.6 }
		expect(node.coordinates('displaced')).toEqual(expected)
	})
})
