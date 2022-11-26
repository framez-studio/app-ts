import { describe, expect, it } from 'vitest'
import {
	Element,
	ElementNode,
	PunctualSpanLoad,
	RectangularSectionCR,
	Structure,
	Support,
} from '@classes'
import { Concrete21 } from '@/utils/material'

describe('xxxx', () => {
	// structure definition
	const col350x350 = new RectangularSectionCR(0.35, 0.35, Concrete21)
	const vga400x300 = new RectangularSectionCR(0.3, 0.4, Concrete21)
	let e = 21538105.7662924
	let a = new Support('fixed', { x: 0, y: 0 })
	let b = new ElementNode({ x: 0, y: 3 })
	let c = new ElementNode({ x: 6, y: 3 })
	let d = new Support('fixed', { x: 6, y: 0 })
	let lCol = new Element(a, b, col350x350, e)
	let beam = new Element(b, c, vga400x300, e)
	let rCol = new Element(c, d, col350x350, e)
	b.addLoads({ fx: 1 })
	const structure = new Structure(lCol, beam, rCol)
	it(`xxxxx`, () => {
		let expected = [
			[0],
			[0],
			[0],
			[6.83e-5],
			[2.25e-7],
			[-1.75e-5],
			[6.72e-5],
			[-2.25e-7],
			[-1.71e-5],
			[0],
			[0],
			[0],
		]
		let result = structure.displacements
		result.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(value).toBeCloseTo(expected[i][j],7)
			})
		})
	})
})
