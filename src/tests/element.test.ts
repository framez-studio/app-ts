import { describe, expect, it } from 'vitest'
import { Element } from '../entities/classes/complex-elements/element'
import { ElementNode } from '../entities/classes/nodes/element-node'
import { FixedSupport } from '../entities/classes/nodes/fixed-support'
import { RectangularHSection } from '../entities/classes/sections/rectangular-h-section'
import { Array2D } from '../entities/interfaces/matrix.interface'

describe('Element Class', () => {
	const section = new RectangularHSection(0.1, 0.1, 0.002, 0.002)
	const points = { i: { x: 0, y: 0 }, f: { x: 3, y: 0 } }
	let nodes = {
		i: new FixedSupport(new ElementNode(points.i)),
		f: new FixedSupport(new ElementNode(points.f)),
	}
	let element = new Element(nodes.i, nodes.f, section, 200000000)

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
	it(`should calculate its area correctly`, () => {
		expect(element.section.area).toBeCloseTo(0.000784)
	})
	it(`should calculate its inertia correctly`, () => {
		expect(element.section.inertiaZ).toBeCloseTo(0.000001255)
	})
	it(`should calculate its local stiffness matrix`, () => {
		let expected = [
			[52266.6667, 0, 0, -52266.6667, 0, 0],
			[0, 111.5951, 167.3927, 0, -111.5951, 167.3927],
			[0, 167.3927, 334.7854, 0, -167.3927, 167.3927],
			[-52266.6667, 0, 0, 52266.6667, 0, 0],
			[0, -111.5951, -167.3927, 0, 111.5951, -167.3927],
			[0, 167.3927, 167.3927, 0, -167.3927, 334.7854],
		]
		let result = element.stiffness('local').data as Array2D

		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
})
