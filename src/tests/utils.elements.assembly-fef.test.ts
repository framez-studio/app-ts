import { Element } from '@classes/complex-elements/element'
import { ElementNode } from '@classes/nodes/element-node'
import { Support } from '@classes/nodes/support'
import { RectangularSpanLoad } from '@classes/others/rectangular-span-load'
import { assemblyFef } from '@utils/elements'
import { Concrete21 } from '@utils/material'
import { describe, expect, it } from 'vitest'

describe(`FEF Assembly function`, () => {
	const section = new RectangularHSection(0.1, 0.1, 0.002, 0.002, Concrete21)
	let e = 200000000
	let a = new Support('hinge', { x: 0, y: 0 })
	let b = new ElementNode({ x: 0, y: 3 })
	let c = new ElementNode({ x: 4, y: 3 })
	let d = new Support('fixed', { x: 4, y: 0 })
	let lCol = new Element(a, b, section)
	let beam = new Element(b, c, section)
	let rCol = new Element(c, d, section)
	it('should generate an assembled fef vector correctly for only a one force', () => {
		let w = 20
		let l = beam.length
		new RectangularSpanLoad(beam, w)
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
		new RectangularSpanLoad(lCol, w)
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
