import { describe, expect, it } from 'vitest'
import { Element } from '@classes/complex-elements/element'
import { Structure } from '@classes/complex-elements/structure'
import { ElementNode } from '@classes/nodes/element-node'
import { Support } from '@classes/nodes/support'
import { Concrete21 } from '@utils/material'
import { RectangularRCSection } from '@classes/sections/rectangular-cr'

describe('Structure Class testing 2.0', () => {
	// structure definition
	const col350x350 = new RectangularRCSection(0.35, 0.35, Concrete21)
	const vga400x300 = new RectangularRCSection(0.3, 0.4, Concrete21)
	let a = new Support('fixed', { x: 0, y: 0 })
	let b = new ElementNode({ x: 0, y: 3 })
	let c = new ElementNode({ x: 6, y: 3 })
	let d = new Support('fixed', { x: 6, y: 0 })
	let lCol = new Element(a, b, col350x350)
	let beam = new Element(b, c, vga400x300)
	let rCol = new Element(c, d, col350x350)
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
	it.todo(
		`s first element should calculate correctly its internal forces`,
		() => {
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
		},
	)
})
