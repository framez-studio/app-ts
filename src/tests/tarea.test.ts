import { describe, expect, it } from 'vitest'
import {
	Element,
	ElementNode,
	RectangularSectionCR,
	RectangularSpanLoad,
	Structure,
	Support,
} from '@classes'
import { Concrete21 } from '@utils'

describe('Structure Class testing 2.0', () => {
	//sections geometry & material definition
	const col350x350 = new RectangularSectionCR(0.35, 0.35, Concrete21)
	const vga400x300 = new RectangularSectionCR(0.3, 0.4, Concrete21)

	let e = 21538105.7662924

	//nodes definition
	let a = new Support('fixed', { x: 0, y: 0 })
	let b = new ElementNode({ x: 0, y: 3 })
	let c = new ElementNode({ x: 6, y: 3 })
	let d = new Support('fixed', { x: 6, y: 0 })

	//elements definition
	let lCol = new Element(a, b, col350x350, e)
	let beam = new Element(b, c, vga400x300, e)
	let rCol = new Element(c, d, col350x350, e)
	beam.release('final', 'rz')

	//structure definition
	let structure = new Structure(lCol, beam, rCol)

	//loads definition & assign
	let load = new RectangularSpanLoad(beam, 1)

	it(`Should calculate correctly its displacements tarea`, () => {
		let matrix = structure.stiffness('reduced')
		let f = structure.fef('reduced')
		let stcol = beam.fef('local')
		let expected = [
			[0],
			[0],
			[0],
			[0.001311e-3],
			[-0.003411e-3],
			[-6.4e-5],
			[-0.001311e-3],
			[-0.003411e-3],
			[6.4e-5],
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
		let expected = [[1.13], [3], [-1.1219], [-1.13], [-3], [-2.2673]]
		let result = lCol.forces
		let result2 = beam.forces
		let result3 = rCol.forces
		result.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(value).toBeCloseTo(expected[i][j])
			})
		})
	})
})
