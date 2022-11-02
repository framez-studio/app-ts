import { describe, expect, it } from 'vitest'
import { SMatrixOperator } from '../entities/classes/matrices/s-matrix-operator'

describe('SMatrix Operator Class', () => {
	const data = [
		[52266.6667, 0, 0, -52266.6667, 0, 0],
		[0, 111.5951, 167.3927, 0, -111.5951, 167.3927],
		[0, 167.3927, 334.7854, 0, -167.3927, 167.3927],
		[-52266.6667, 0, 0, 52266.6667, 0, 0],
		[0, -111.5951, -167.3927, 0, 111.5951, -167.3927],
		[0, 167.3927, 167.3927, 0, -167.3927, 334.7854],
	]
	const sMatOp = new SMatrixOperator()
	it('should transform the coordinates of a stiffness matrix', () => {
		let expected = [
			[111.5951, 0, -167.3927, -111.5951, 0, -167.3927],
			[0, 52266.6667, 0, 0, -52266.6667, 0],
			[-167.3927, 0, 334.7854, 167.3927, 0, 167.3927],
			[-111.5951, 0, 167.3927, 111.5951, 0, 167.3927],
			[0, -52266.6667, 0, 0, 52266.6667, 0],
			[-167.3927, 0, 167.3927, 167.3927, 0, 334.7854],
		]
		let alpha = 90
		let result = sMatOp.rotate(data, alpha)
		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toBeCloseTo(value)
			})
		})
	})
	it('should extract the submatrices of a 2D element stiffness matrix', () => {
		let expected = [
			[
				[
					[52266.6667, 0, 0],
					[0, 111.5951, 167.3927],
					[0, 167.3927, 334.7854],
				],
				[
					[-52266.6667, 0, 0],
					[0, -111.5951, 167.3927],
					[0, -167.3927, 167.3927],
				],
			],
			[
				[
					[-52266.6667, 0, 0],
					[0, -111.5951, -167.3927],
					[0, 167.3927, 167.3927],
				],
				[
					[52266.6667, 0, 0],
					[0, 111.5951, -167.3927],
					[0, -167.3927, 334.7854],
				],
			],
		]
		let result = sMatOp.submatrices(data)
		expected.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(result[i][j]).toEqual(value)
			})
		})
	})
})
