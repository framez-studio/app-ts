import { describe, expect, it } from 'vitest'
import { Element } from '@classes/complex-elements/element'
import { Structure } from '@classes/complex-elements/structure'
import { ElementNode } from '@classes/nodes/element-node'
import { Support } from '@classes/nodes/support'
import { RectangularSpanLoad } from '@classes/others/rectangular-span-load'
import { Concrete21 } from '@utils/material'
import { RectangularRCSection } from '@classes/sections/rectangular-cr'

describe('Structure Class testing 2.0', () => {
	//sections geometry & material definition
	const col350x350 = new RectangularRCSection(0.35, 0.35, Concrete21)
	const vga400x300 = new RectangularRCSection(0.3, 0.4, Concrete21)

	//nodes definition
	let a = new Support('fixed', { x: 0, y: 0 })
	let b = new ElementNode({ x: 0, y: 3 })
	let c = new ElementNode({ x: 6, y: 3 })
	let d = new Support('fixed', { x: 6, y: 0 })

	//elements definition
	let lCol = new Element(a, b, col350x350)
	let beam = new Element(b, c, vga400x300)
	let rCol = new Element(c, d, col350x350)
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
