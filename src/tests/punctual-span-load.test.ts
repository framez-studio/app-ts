import { describe, expect, it } from 'vitest'
import { PunctualSpanLoad } from '@classes'

describe('Punctual Span Load Class', () => {
	const l = 4
	const w = 4
	const a = 2
	const load = new PunctualSpanLoad(w, l, a)

	it('should calculate correctly values for a load on the mid of the span', () => {
		let result = load.fef
		expect(result.initial.fx).toBe(0)
		expect(result.initial.fy).toBe(w / 2)
		expect(result.initial.mz).toBe((w * l) / 8)
		expect(result.final.fx).toBe(0)
		expect(result.final.fy).toBe(w / 2)
		expect(result.final.mz).toBe((-w * l) / 8)
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
		let sum = result.initial.fy + result.final.fy - w
		expect(sum).toBe(0)
	})
	it('should provide momentum equilibrium', () => {
		let result = load.fef
		let sum =
			result.initial.mz +
			result.final.mz -
			result.initial.fy * l +
			(w * l) / 2
		expect(sum).toBe(0)
	})
})
