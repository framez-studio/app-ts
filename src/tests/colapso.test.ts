import { describe, expect, it } from 'vitest'
import {
	Element,
	ElementNode,
	RectangularSectionCR,
	Structure,
	Support,
} from '@classes'
import { Concrete21 } from '@/utils/material'

describe('Structure Class testing 2.0', () => {
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
	it(`Should calculate correctly its displacements`, () => {
		let expected = [
			[0],
			[0],
			[0],
			[0.000068333711402582],
			[0.000000225307438589532],
			[-0.0000175437502256072],
			[0.0000671798998629565],
			[-0.000000225307438589536],
			[-0.0000171066562674751],
			[0],
			[0],
			[0],
		]
		let result = structure.displacements
		result.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(value).toBeCloseTo(expected[i][j])
			})
		})
	})
	it(`s first element should calculate correctly its internal forces`, () => {
		let expected = [
			[0.19815173],
			[-0.5029817],
			[-0.91197946],
			[-0.19815173],
			[0.5029817],
			[-0.59696564],
		]
		let result = lCol.forces
		result.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(value).toBeCloseTo(expected[i][j])
			})
		})
	})
})