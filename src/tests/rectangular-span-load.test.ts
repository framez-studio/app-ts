import { describe, expect, it } from 'vitest'
import { RectangularSpanLoad } from '../entities/classes/others/rectangular-span-load'

describe('Rectangular Span Load Class', () => {
	const w = 20
	const l = 2
	const load = new RectangularSpanLoad(w, l)
	it('should calculate correctly the FEF on a full span load', () => {
		let result = load.fef
		expect(result.initial.mz).toBe((w * l ** 2) / 12)
		expect(result.final.mz).toBe(-(w * l ** 2) / 12)
		expect(result.initial.fy).toBe((w * l) / 2)
		expect(result.final.fy).toBe((w * l) / 2)
	})
})
