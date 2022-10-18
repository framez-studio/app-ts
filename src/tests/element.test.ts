import { describe, expect, it } from 'vitest'
import { Element } from '../entities/classes/complex-elements/element'
import { FixedSupport } from '../entities/classes/nodes/fixed-support'
import { RectangularHSection } from '../entities/classes/sections/rectangular-h-section'
import { Array2D } from '../entities/interfaces/matrix.interface'

describe('Element Class', () => {
	const section = new RectangularHSection(4, 4, 0, 0)
	const points = { i: { x: 0, y: 0 }, f: { x: 2, y: 2 } }
	let nodes = {
		i: new FixedSupport(points.i),
		f: new FixedSupport(points.f),
	}
	let element = new Element(nodes.i, nodes.f, section, 200000)

	it(`should calculate its length`, () => {
		let expected = Math.sqrt(
			(points.f.y - points.i.y) ** 2 + (points.f.x - points.i.x) ** 2,
		)
		expect(element.length).toBe(expected)
	})
	it(`should calculate its slope in degrees`, () => {
		let expected =
			(Math.atan2(points.f.y - points.i.y, points.f.x - points.i.x) *
				180) /
			Math.PI
		expect(element.inclination).toBe(expected)
	})
	it(`s stiffness method should return an IMatrix element`, () => {
		expect('inverse' in element.stiffness('local')).toBeTruthy()
	})
	it(`should calculate its local stiffness matrix`, () => {
		let expected = [
			[52266.67, 0, 0, -52266.67, 0, 0],
			[0, 111.56, 167.33, 0, -111.56, 167.33],
			[0, 167.33, 334.67, 0, -167.33, 167.33],
			[-52266.67, 0, 0, 52266.67, 0, 0],
			[0, -111.56, -167.33, 0, 111.56, -167.33],
			[0, 167.33, 167.33, 0, -167.33, 334.67],
		]
		let result = element.stiffness('local').data as Array2D

		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
})
