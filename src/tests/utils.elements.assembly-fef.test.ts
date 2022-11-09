import {
	ElementNode,
	RectangularHSection,
	Support,
	Element,
	RectangularSpanLoad,
} from '@classes'
import { assemblyFef } from '@utils'
import { describe, expect, it } from 'vitest'

describe(`FEF Assembly function`, () => {
	const section = new RectangularHSection(0.1, 0.1, 0.002, 0.002)
	let e = 200000000
	let a = new Support('hinge', 0, 0)
	let b = new ElementNode(0, 3)
	let c = new ElementNode(4, 3)
	let d = new Support('fixed', 4, 0)
	let lCol = new Element(a, b, section, e)
	let beam = new Element(b, c, section, e)
	let rCol = new Element(c, d, section, e)
	it('should generate an assembled fef vector correctly for only a one force', () => {
		let w = 20
		let l = beam.length
		beam.addSpanLoad(new RectangularSpanLoad(w, l))
		let expected = [
			[0],
			[0],
			[0],
			[0],
			[(w * l) / 2],
			[(w * l ** 2) / 12],
			[0],
			[(w * l) / 2],
			[-(w * l ** 2) / 12],
			[0],
			[0],
			[0],
		]
		let result = assemblyFef([a, b, c, d], [beam, lCol, rCol])
		expect(result).toEqual(expected)
	})
	it('should generate fefs on global coordinates for rotated elements', () => {
		let w = 20
		let l = beam.length
		let lc = lCol.length
		lCol.addSpanLoad(new RectangularSpanLoad(w, lc))
		let expected = [
			[-(w * lc) / 2],
			[0],
			[(w * lc ** 2) / 12],
			[-(w * lc) / 2 + 0],
			[0 + (w * l) / 2],
			[-(w * lc ** 2) / 12 + (w * l ** 2) / 12],
			[0],
			[(w * l) / 2],
			[-(w * l ** 2) / 12],
			[0],
			[0],
			[0],
		]
		let result = assemblyFef([a, b, c, d], [beam, lCol, rCol])
		result.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(value).toBeCloseTo(expected[i][j])
			})
		})
	})
})
