import { describe, expect, it } from 'vitest'
import {
	Element,
	ElementNode,
	MatrixOperator as matOp,
	PunctualSpanLoad,
	RectangularHSection,
} from '@classes'

describe('Element Class', () => {
	const section = new RectangularHSection(0.1, 0.1, 0.002, 0.002)
	const points = { i: { x: 0, y: 0 }, f: { x: 0, y: 3 } }
	let nodes = {
		i: new ElementNode(points.i),
		f: new ElementNode(points.f),
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
	it(`should return its releases`, () => {
		let expected = [false, false, false, false, false, false]
		expect(element.releases).toEqual(expected)
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
		let result = element.stiffness('local')

		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
	it(`should calculate its global stiffness matrix`, () => {
		let expected = [
			[111.5951, 0, -167.3927, -111.5951, 0, -167.3927],
			[0, 52266.6667, 0, 0, -52266.6667, 0],
			[-167.3927, 0, 334.7854, 167.3927, 0, 167.3927],
			[-111.5951, 0, 167.3927, 111.5951, 0, 167.3927],
			[0, -52266.6667, 0, 0, 52266.6667, 0],
			[-167.3927, 0, 167.3927, 167.3927, 0, 334.7854],
		]
		let result = element.stiffness('global')

		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
	it('should allow to create new connected IElement object with same properties', () => {
		let fNode = new ElementNode(3, 3)
		let newElement = element.newConnectedElement('final', fNode)
		let sharedNode = newElement.nodes.initial === element.nodes.final
		let sameYoung = newElement.young === element.young
		let sameSection = newElement.section === element.section
		expect(sharedNode).toBeTruthy()
		expect(sameYoung).toBeTruthy()
		expect(sameSection).toBeTruthy()
	})
	it('should allow to set its spanload', () => {
		let load = new PunctualSpanLoad(20, element.length, 1)
		element.setSpanLoad(load)
		expect(element.fef('local')).toEqual(load.fefArray)
	})
	it(`should allow to add multiple span loads`, () => {
		let load1 = new PunctualSpanLoad(20, element.length, 1)
		element.setSpanLoad(load1)
		element.addSpanLoad(load1)
		let expected = matOp.sum(load1.fefArray, load1.fefArray)
		expect(element.fef('local')).toEqual(expected)
	})
})
