import { describe, expect, it } from 'vitest'
import { Element } from '@classes/complex-elements/element'
import { Structure } from '@classes/complex-elements/structure'
import { ElementNode } from '@classes/nodes/element-node'
import { Support } from '@classes/nodes/support'
import { RectangularSpanLoad } from '@classes/others/rectangular-span-load'
import { Concrete21Pascal } from '@utils/material'

describe('Structure Class', () => {
	// structure definition
	const section = new RectangularHSection(
		0.1,
		0.1,
		0.002,
		0.002,
		Concrete21Pascal,
	)
	let e = 200000000
	let a = new Support('fixed', { x: 0, y: 0 })
	let b = new ElementNode({ x: 0, y: 3 })
	let c = new ElementNode({ x: 4, y: 3 })
	let d = new Support('fixed', { x: 4, y: 0 })
	let lCol = new Element(a, b, section)
	let beam = new Element(b, c, section)
	let rCol = new Element(c, d, section)
	const structure = new Structure(lCol, rCol, beam)
	// loads definition
	const w = 12
	new RectangularSpanLoad(beam, w)

	it('should return an array with the given elements in the constructor', () => {
		expect(structure.elements).toEqual([lCol, rCol, beam])
	})
	it.todo(
		'should return the nodes ordered by x first and then y coordinates',
		() => {
			expect(structure.nodes).toEqual([a, b, c, d])
		},
	)
	it('should allow to access one of its nodes by coordinates', () => {
		expect(structure.node({ x: 0, y: 0 })).toBe(a)
	})
	it('should throw an error if trying to get a node with non-existent coordinates', () => {
		expect(() => structure.node({ x: 100, y: 100 })).toThrowError()
	})
	it('should allow to access one of its elements by coordinates', () => {
		expect(structure.element({ x: 0, y: 0 }, { x: 0, y: 3 })).toBe(lCol)
	})
	it('should throw an error if trying to get an element with non-existent coordinates', () => {
		expect(() =>
			structure.element({ x: 0, y: 100 }, { x: 0, y: 3 }),
		).toThrowError()
	})
	it('should allow to add a support with the coordinates of an existing node in the structure', () => {
		structure.setSupport({ x: 0, y: 0 }, 'fixed')
		expect(a.constraints.dx).toBe(true)
		expect(a.constraints.dy).toBe(true)
		expect(a.constraints.rz).toBe(true)
	})
	it('should throw an error if trying to add a support with non-existent coordinates', () => {
		expect(() => structure.setSupport({ x: 100, y: 0 }, 'hinge')).toThrow()
	})
	it('should generate its full stiffness matrix', () => {
		let expected = [
			[111.5951, 0, -167.3927, -111.5951, 0, -167.3927, 0, 0, 0, 0, 0, 0],
			[0, 52266.6667, 0, 0, -52266.6667, 0, 0, 0, 0, 0, 0, 0],
			[-167.3927, 0, 334.7854, 167.3927, 0, 167.3927, 0, 0, 0, 0, 0, 0],
			[
				-111.5951, 0, 167.3927, 39311.5951, 0, 167.3927, -39200, 0, 0,
				0, 0, 0,
			],
			[
				0, -52266.6667, 0, 0, 52313.7459, 94.1584, 0, -47.0792, 94.1584,
				0, 0, 0,
			],
			[
				-167.3927, 0, 167.3927, 167.3927, 94.1584, 585.8745, 0,
				-94.1584, 125.5445, 0, 0, 0,
			],
			[
				0, 0, 0, -39200, 0, 0, 39311.5951, 0, 167.3927, -111.5951, 0,
				167.3927,
			],
			[
				0, 0, 0, 0, -47.0792, -94.1584, 0, 52313.7459, -94.1584, 0,
				-52266.6667, 0,
			],
			[
				0, 0, 0, 0, 94.1584, 125.5445, 167.3927, -94.1584, 585.8745,
				-167.3927, 0, 167.3927,
			],
			[0, 0, 0, 0, 0, 0, -111.5951, 0, -167.3927, 111.5951, 0, -167.3927],
			[0, 0, 0, 0, 0, 0, 0, -52266.6667, 0, 0, 52266.6667, 0],
			[0, 0, 0, 0, 0, 0, 167.3927, 0, 167.3927, -167.3927, 0, 334.7854],
		]
		let result = structure.stiffness('full')
		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
	it(`should generate its reduced stiffness matrix according with the constraints of its nodes`, () => {
		let expected = [
			[39311.5951, 0.0, 167.3927, -39200.0, 0.0, 0.0],
			[0.0, 52313.7459, 94.1584, 0.0, -47.0792, 94.1584],
			[167.3927, 94.1584, 585.8745, 0.0, -94.1584, 125.5445],
			[-39200.0, 0.0, 0.0, 39311.5951, 0.0, 167.3927],
			[0.0, -47.0792, -94.1584, 0.0, 52313.7459, -94.1584],
			[0.0, 94.1584, 125.5445, 167.3927, -94.1584, 585.8745],
		]
		let result = structure.stiffness('reduced')
		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
	it(`should return its node loads, ordered by nodes`, () => {
		b.addLoads({ fx: 5 })
		let expected = [
			[0],
			[0],
			[0],
			[5],
			[0],
			[0],
			[0],
			[0],
			[0],
			[0],
			[0],
			[0],
		]
		expect(structure.nodeLoads).toEqual(expected)
	})
	it(`should return its full assembled fefs as an array`, () => {
		let l = beam.length
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
		expect(structure.fef('full')).toEqual(expected)
	})
	it(`should return its reduced assembled fefs as an array`, () => {
		let l = beam.length
		let expected = [
			[0],
			[(w * l) / 2],
			[(w * l ** 2) / 12],
			[0],
			[(w * l) / 2],
			[-(w * l ** 2) / 12],
		]
		expect(structure.fef('reduced')).toEqual(expected)
	})
	it.todo(
		`should return its degs of freedom as an array of booleans`,
		() => {},
	)
	it(`should calculate its displacements for the assigned loads and return an array`, () => {
		let expected = [
			[0],
			[0],
			[0],
			[0.03475],
			[-0.00043],
			[-0.04295],
			[0.03453],
			[-0.00049],
			[0.02664],
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
	it(`should mutate the displacements of its nodes after getting the structure displacements`, () => {
		let displacements = [
			{ dx: 0, dy: 0, rz: 0 },
			{ dx: 0.03475, dy: -0.00043, rz: -0.04295 },
			{ dx: 0.03453, dy: -0.00049, rz: 0.02664 },
			{ dx: 0, dy: 0, rz: 0 },
		]
		let nodes = structure.nodes
		nodes.forEach((node, i) => {
			expect(node.displacements.dx).toBeCloseTo(displacements[i].dx)
			expect(node.displacements.dy).toBeCloseTo(displacements[i].dy)
			expect(node.displacements.rz).toBeCloseTo(displacements[i].rz)
		})
	})
	it(`s elements should calculate correctly the corresponding internal forces`, () => {
		let forces = []
	})
})
