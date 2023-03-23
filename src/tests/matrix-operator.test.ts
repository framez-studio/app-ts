import { describe, expect, it } from 'vitest'
import { MatrixOperator as MatOp } from '@classes/matrices/matrix-operator'

describe('Matrix Operator', () => {
	let data = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	]
	it('should sum n matrices', () => {
		let n = 3
		let expected = [
			[n * 1, n * 2, n * 3],
			[n * 4, n * 5, n * 6],
			[n * 7, n * 8, n * 9],
		]
		let result = MatOp.sum(data, data, data)
		expect(result).toEqual(expected)
	})
	it('should substract n matrices', () => {
		let n = 3
		let expected = [
			[1 * (2 - n), 2 * (2 - n), 3 * (2 - n)],
			[4 * (2 - n), 5 * (2 - n), 6 * (2 - n)],
			[7 * (2 - n), 8 * (2 - n), 9 * (2 - n)],
		]
		let result = MatOp.subtract(data, data, data)
		expect(result).toEqual(expected)
	})
	it('should multiply 3 matrices', () => {
		let expected = [
			[468, 576, 684],
			[1062, 1305, 1548],
			[1656, 2034, 2412],
		]
		let result = MatOp.multiply(data, data, data)
		expect(result).toEqual(expected)
	})
	it('should inverse a matrix', () => {
		let matrix = [
			[89, 8, 9],
			[7, 12, 10],
			[6, 32, 6],
		]
		let inverse = [
			[31 / 2570, -3 / 257, 7 / 5140],
			[-9 / 10280, -6 / 257, 827 / 20560],
			[-19 / 2570, 35 / 257, -253 / 5140],
		]
		let result = MatOp.inverse(matrix)
		result.forEach((row, i) => {
			row.forEach((col, j) => {
				expect(col).toBeCloseTo(inverse[i][j])
			})
		})
	})
	it('should transpose a matrix', () => {
		let expected = [
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
		]
		let result = MatOp.transpose(data)
		expect(result).toEqual(expected)
	})
	it('should subset correctly an element of the array', () => {
		let i = 0
		let j = 2
		const expected = data[i][j]
		expect(MatOp.subset(data, i, j)).toEqual(expected)
	})
	it('should subset correctly a continious range of the array', () => {
		let i = [0, 1] as [number, number]
		let j = [0, 1] as [number, number]
		const expected = [
			[1, 2],
			[4, 5],
		]
		expect(MatOp.subset(data, i, j)).toEqual(expected)
	})
	it('should subset correctly a column of the array', () => {
		let i = [0, 1] as [number, number]
		let j = 0
		const expected = [[1], [4]]
		expect(MatOp.subset(data, i, j)).toEqual(expected)
	})
	it('should extract correctly the size of a matrix', () => {
		expect(MatOp.size(data)).toEqual([3, 3])
	})
	it('should create a nxm zeros matrix', () => {
		let expected = [
			[0, 0],
			[0, 0],
			[0, 0],
		]
		let result = MatOp.zeros([3, 2])
		expect(result).toEqual(expected)
	})
	it(`should replace correctly an array inside another array`, () => {
		let i = [0, 1] as [number, number]
		let j = [0, 1] as [number, number]
		let newData = [
			[0, 0],
			[0, 0],
		]
		const expected = [
			[0, 0, 3],
			[0, 0, 6],
			[7, 8, 9],
		]
		expect(MatOp.replace(data, i, j, newData)).toEqual(expected)
	})
	it(`should delete a series of specified rows from an Array2D`, () => {
		let rows = [0, 2]
		let expected = [[4, 5, 6]]
		expect(MatOp.deleteRows(data, ...rows)).toEqual(expected)
	})
	it(`should delete a series of specified columns from an Array2D`, () => {
		let cols = [0, 2]
		let expected = [[2], [5], [8]]
		expect(MatOp.deleteCols(data, ...cols)).toEqual(expected)
	})
	// TODO:
	it.todo('should subset correctly a row of an Array1D', () => {
		let data = [1, 2, 3, 4, 5]
		let i = 0
		let j = [0, 2] as [number, number]
		const expected = [1, 2, 3]
		expect(MatOp.subset(data, i, j)).toEqual(expected)
	})
})
