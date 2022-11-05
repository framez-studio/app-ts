import { describe, expect, it } from 'vitest'
import {
	Element,
	ElementNode,
	RectangularHSection,
	RectangularSpanLoad,
	Structure,
	Support,
} from '@classes'

describe('Structure Class', () => {
	const section = new RectangularHSection(0.1, 0.1, 0.002, 0.002)
	let e = 200000000
	let a = new Support('fixed', 0, 0)
	let b = new ElementNode(0, 3)
	let c = new ElementNode(4, 3)
	let d = new Support('fixed', 4, 0)
	let lCol = new Element(a, b, section, e)
	let beam = new Element(b, c, section, e)
	let rCol = new Element(c, d, section, e)
	const structure = new Structure(lCol, rCol, beam)

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
		expect(structure.node(0, 0)).toBe(a)
	})
	it('should throw an error if trying to get a node with non-existent coordinates', () => {
		expect(() => structure.node(100, 100)).toThrowError()
	})
	it('should allow to access one of its elements by coordinates', () => {
		expect(structure.element({ x: 0, y: 0 }, { x: 0, y: 3 })).toBe(lCol)
	})
	it('should throw an error if trying to get an element with non-existent coordinates', () => {
		expect(() =>
			structure.element({ x: 0, y: 100 }, { x: 0, y: 3 }),
		).toThrowError()
	})
	it.skip('should allow to add a support with the coordinates of an existing node in the structure', () => {
		structure.setSupport(0, 0, 'hinge')
		expect(a.constraints.dx).toBeTruthy()
		expect(a.constraints.dy).toBeTruthy()
		expect(a.constraints.rz).toBeFalsy()
	})
	it('should throw an error if trying to add a support with non-existent coordinates', () => {
		expect(() => structure.setSupport(100, 0, 'hinge')).toThrow()
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
		b.addLoad('fx', 30)
		b.addLoad('fy', -30)
		c.addLoad('mz', -50)
		let expected = [
			[0],
			[0],
			[0],
			[30],
			[-30],
			[0],
			[0],
			[0],
			[-50],
			[0],
			[0],
			[0],
		]
		expect(structure.nodeLoads).toEqual(expected)
	})
	it.todo(`should return its assembled fefs as an array`, () => {
		let w = 20
		let l = beam.length
		let load = new RectangularSpanLoad(w, l)
		beam.addSpanLoad(load)
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
		expect(structure.fef).toEqual(expected)
	})
})
