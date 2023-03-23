import { Support } from '@classes/nodes/support'
import { describe, expect, it } from 'vitest'

describe('Support Class', () => {
	it(`should generate a fixed type support correctly`, () => {
		const support = new Support('fixed', { x: 0, y: 0 })
		let expected = {
			dx: true,
			dy: true,
			rz: true,
		}
		expect(support.constraints).toEqual(expected)
	})
	it(`should generate a hinge type support correctly`, () => {
		const support = new Support('hinge', { x: 0, y: 0 })
		let expected = {
			dx: true,
			dy: true,
			rz: false,
		}
		expect(support.constraints).toEqual(expected)
	})
	it(`should generate an x-axis simple type support correctly`, () => {
		const support = new Support('simple-x', { x: 0, y: 0 })
		let expected = {
			dx: true,
			dy: false,
			rz: false,
		}
		expect(support.constraints).toEqual(expected)
	})
	it(`should generate a y-axis type support correctly`, () => {
		const support = new Support('simple-y', { x: 0, y: 0 })
		let expected = {
			dx: false,
			dy: true,
			rz: false,
		}
		expect(support.constraints).toEqual(expected)
	})
})
