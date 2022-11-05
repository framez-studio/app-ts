import { describe, expect, it } from 'vitest'
import { assemblyMatrix } from '@utils'
import { Element, ElementNode, RectangularHSection } from '@classes'

describe('Elements utils', () => {
	const section = new RectangularHSection(0.1, 0.1, 0.002, 0.002)
	let e = 200000000
	let a = new ElementNode(0, 0)
	let b = new ElementNode(0, 3)
	let c = new ElementNode(4, 3)
	let d = new ElementNode(4, 0)
	const nodes = [a, b, c, d]
	let lCol = new Element(a, b, section, e)
	let beam = new Element(b, c, section, e)
	let rCol = new Element(c, d, section, e)
	const elements = [lCol, rCol, beam]
	it('should return a matrix with size according to the number of degs of freedom', () => {
		let result = assemblyMatrix(nodes, elements)
		let rows = result.length
		let cols = result[0].length
		let expectedSize = nodes.length * 3
		expect(rows).toBe(expectedSize)
		expect(cols).toBe(rows)
	})
	it(`should generate an assembled Stiffness Matrix correctly`, () => {
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
		let result = assemblyMatrix(nodes, elements)
		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
})
