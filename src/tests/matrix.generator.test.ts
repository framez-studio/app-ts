import { describe, expect, it } from 'vitest'
import { MatrixGenerator as MatGen } from '@classes/matrices/matrix-generator'

describe('Matrix Generator', () => {
	const e = 200000000
	const i = (0.1 ** 4 - 0.096 ** 4) / 12
	const a = 0.000784
	const l = 3
	const angle = 90
	it('should generate a full local Stiffness Matrix', () => {
		let expected = [
			[52266.6667, 0, 0, -52266.6667, 0, 0],
			[0, 111.5951, 167.3927, 0, -111.5951, 167.3927],
			[0, 167.3927, 334.7854, 0, -167.3927, 167.3927],
			[-52266.6667, 0, 0, 52266.6667, 0, 0],
			[0, -111.5951, -167.3927, 0, 111.5951, -167.3927],
			[0, 167.3927, 167.3927, 0, -167.3927, 334.7854],
		]
		let result = MatGen.stiffness(e, l, a, i)
		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
	it('should generate a reduced degs of freedom Stiffness Matrix', () => {
		let expected = [
			[39200, 0, 0, -39200, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[-39200, 0, 0, 39200, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
		]
		let result = MatGen.stiffness(e, 4, a, i, [
			false,
			false,
			true,
			false,
			false,
			true,
		])
		expect(result).toEqual(expected)
	})
	it('should generate a Transformation Matrix', () => {
		let expected = [
			[0, 1, 0, 0, 0, 0],
			[-1, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 0],
			[0, 0, 0, -1, 0, 0],
			[0, 0, 0, 0, 0, 1],
		]
		let result = MatGen.transformation(angle)
		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
})
