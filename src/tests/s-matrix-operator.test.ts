import { describe, expect, it } from 'vitest'
import { SMatrixOperator as MatOp } from '../entities/classes/matrices/s-matrix-operator'
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
		let result = MatOp.rotate(data, alpha)
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
		let result = MatOp.submatrices(data)
		expect(expected.ii).toEqual(result.ii)
		expect(expected.ij).toEqual(result.ij)
		expect(expected.ji).toEqual(result.ji)
		expect(expected.jj).toEqual(result.jj)
	})
	it('should delete the degs of freedom of a given matrix', () => {
		let degs = [0, 1, 5]
		let expected = [
			[334.7854, 0, -167.3927],
			[0, 52266.6667, 0],
			[-167.3927, 0, 111.5951],
		]
		expect(MatOp.reduceDegs('matrix', data, ...degs)).toEqual(expected)
	})
	it('should delete the degs of freedom of a given vector', () => {
		let vector = [[0], [1], [2], [3], [4], [5]]
		let degs = [0, 1, 5]
		let expected = [[2], [3], [4]]
		expect(MatOp.reduceDegs('vector', vector, ...degs)).toEqual(expected)
	})
})
