import { describe, expect, it } from 'vitest'
import { SMatrix } from '../entities/classes/matrices/s-matrix'
import { Array2D } from '../entities/interfaces/matrix.interface'

describe('Stiffness Matrix Class', () => {
	const e = 200000000
	const i = (0.1 ** 4 - 0.096 ** 4) / 12
	const a = 0.000784
	const l = 3
	const matrix = new SMatrix(e, l, a, i)

	it('should calculate correctly its factorized version', () => {
		let expectedFactor = (e * i) / l ** 3
		let expectedMatrix = [
			[(a * l * l) / i, 0, 0, (-a * l * l) / i, 0, 0],
			[0, 12, 6 * l, 0, -12, 6 * l],
			[0, 6 * l, 4 * l * l, 0, -6 * l, 2 * l * l],
			[(-a * l * l) / i, 0, 0, (a * l * l) / i, 0, 0],
			[0, -12, -6 * l, 0, 12, -6 * l],
			[0, 6 * l, 2 * l * l, 0, -6 * l, 4 * l * l],
		]
		let result = matrix.factorized()
		expect(result.factor).toBe(expectedFactor)
		expect(result.matrix.data).toEqual(expectedMatrix)
	})
	it('should calculate correctly its full version', () => {
		let expected = [
			[52266.6667, 0, 0, -52266.6667, 0, 0],
			[0, 111.5951, 167.3927, 0, -111.5951, 167.3927],
			[0, 167.3927, 334.7854, 0, -167.3927, 167.3927],
			[-52266.6667, 0, 0, 52266.6667, 0, 0],
			[0, -111.5951, -167.3927, 0, 111.5951, -167.3927],
			[0, 167.3927, 167.3927, 0, -167.3927, 334.7854],
		]
		let result = matrix.full().data as Array2D
		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
	it('should calculate correctly its transformed version to global coordinates', () => {
		let expected = [
			[111.5951, 0, -167.3927, -111.5951, 0, -167.3927],
			[0, 52266.6667, 0, 0, -52266.6667, 0],
			[-167.3927, 0, 334.7854, 167.3927, 0, 167.3927],
			[-111.5951, 0, 167.3927, 111.5951, 0, 167.3927],
			[0, -52266.6667, 0, 0, 52266.6667, 0],
			[-167.3927, 0, 167.3927, 167.3927, 0, 334.7854],
		]
		let result = matrix.toGlobal(90).data as Array2D
		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
})
