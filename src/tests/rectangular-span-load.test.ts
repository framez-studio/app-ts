import { describe, expect, it } from 'vitest'
import { RectangularSpanLoad } from '../entities/classes/others/rectangular-span-load'

describe('Rectangular Span Load Class', () => {
	const w = 20
	const l = 2
	let a = 0
	let b = l
	const load = new RectangularSpanLoad(w, l, a, l)
	it('should calculate correctly the FEF on a full span load', () => {
		let result = load.fef
		expect(result.initial.fx).toBe(0)
		expect(result.initial.fy).toBe((w * l) / 2)
		expect(result.initial.mz).toBe((w * l ** 2) / 12)
		expect(result.final.fx).toBe(0)
		expect(result.final.fy).toBe((w * l) / 2)
		expect(result.final.mz).toBe(-(w * l ** 2) / 12)
	})
	it('should return its resultants as a matrix', () => {
		let expected = [
			[load.fef.initial.fx],
			[load.fef.initial.fy],
			[load.fef.initial.mz],
			[load.fef.final.fx],
			[load.fef.final.fy],
			[load.fef.final.mz],
		]
		expect(load.fefArray).toEqual(expected)
	})
	it('should provide x-forces equilibrium', () => {
		let result = load.fef
		let sum = result.initial.fx + result.final.fx
		expect(sum).toBe(0)
	})
	it('should provide y-forces equilibrium', () => {
		let result = load.fef
		let sum = result.initial.fy + result.final.fy - w * (b - a)
		expect(sum).toBe(0)
	})
	it('should provide momentum equilibrium', () => {
		let result = load.fef
		let sum =
			result.initial.mz +
			result.final.mz +
			result.final.fy * l -
			(w * (b - a) ** 2) / 2
		expect(sum).toBe(0)
	})
})
