import { describe, expect, it } from 'vitest'
import { Matrix } from '../entities/classes/matrices/matrix'

describe('Matrix Class', () => {
	const data = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	]
	const matrix = new Matrix(data)
	it('should store its the data correctly', () => {
		expect(matrix.data).toEqual(data)
	})
	it('should sum correctly anoter matrix shape array', () => {
		const expected = [
			[2, 4, 6],
			[8, 10, 12],
			[14, 16, 18],
		]
		expect(matrix.add(data).data).toEqual(expected)
	})
	it('should subtract correctly anoter matrix shape array', () => {
		const expected = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		]
		expect(matrix.subtract(data).data).toEqual(expected)
	})
	it('should subset correctly an element of the array', () => {
		let i = 0
		let j = 2
		const expected = data[i][j]
		expect(matrix.subset(i, j).data).toEqual(expected)
	})
	it('should subset correctly a continious range of the array', () => {
		let i = [0, 1] as [number, number]
		let j = [0, 1] as [number, number]
		const expected = [
			[1, 2],
			[4, 5],
		]
		expect(matrix.subset(i, j).data).toEqual(expected)
	})
	it('should subset correctly a column of the array', () => {
		let i = [0, 1] as [number, number]
		let j = 0
		const expected = [[1], [4]]
		expect(matrix.subset(i, j).data).toEqual(expected)
	})
})
