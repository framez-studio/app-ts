import { describe, expect, it } from 'vitest'
import { SMatrixOperator } from '../entities/classes/matrices/s-matrix-operator'
import { stiffnessSubmatrices2DObject } from '../entities/types'

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
		let expected: stiffnessSubmatrices2DObject = {
			ii: [
				[52266.6667, 0, 0],
				[0, 111.5951, 167.3927],
				[0, 167.3927, 334.7854],
			],
			ij: [
				[-52266.6667, 0, 0],
				[0, -111.5951, 167.3927],
				[0, -167.3927, 167.3927],
			],
			ji: [
				[-52266.6667, 0, 0],
				[0, -111.5951, -167.3927],
				[0, 167.3927, 167.3927],
			],
			jj: [
				[52266.6667, 0, 0],
				[0, 111.5951, -167.3927],
				[0, -167.3927, 334.7854],
			],
		}
		let result = sMatOp.submatrices(data)
		expect(expected.ii).toEqual(result.ii)
		expect(expected.ij).toEqual(result.ij)
		expect(expected.ji).toEqual(result.ji)
		expect(expected.jj).toEqual(result.jj)
	})
})
