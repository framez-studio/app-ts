import { Array2D, Array1D } from '@types'
import { algebra } from '@utils'

export class MatrixOperator {
	static sum(...matrices: (Array2D | Array1D)[]): Array2D | Array1D {
		let result = matrices.reduce((acc, value) => {
			return algebra.add(acc, value)
		})
		return result
	}
	static subtract(...matrices: (Array2D | Array1D)[]): Array2D | Array1D {
		let result = matrices.reduce((acc, value) => {
			return algebra.subtract(acc, value)
		})
		return result
	}
	static multiply(
		...matrices: (Array2D | Array1D | number)[]
	): Array2D | Array1D {
		let result = matrices.reduce((acc, value) => {
			return algebra.multiply(acc, value) as Array2D | Array1D
		}) as Array2D | Array1D
		return result
	}
	static inverse(matrix: Array2D): Array2D {
		let result = algebra.inv(matrix)
		return result
	}
	static transpose(matrix: Array2D): Array2D {
		let result = algebra.transpose(matrix)
		return result
	}
	static subset(
		matrix: Array2D | Array1D,
		rows: number | [number, number],
		columns: number | [number, number],
	): number | (Array2D | Array1D) {
		let rowsRange =
			typeof rows === 'number'
				? rows
				: algebra.range(rows[0], rows[1], true)
		let colRange =
			typeof columns === 'number'
				? columns
				: algebra.range(columns[0], columns[1], true)
		let indexes = algebra.index(rowsRange, colRange)
		let data = algebra.subset(matrix, indexes)
		return data
	}
	static replace(
		matrix: Array2D | Array1D,
		rows: number | [number, number],
		columns: number | [number, number],
		value: number | Array2D | Array1D,
	): Array2D | Array1D {
		let rowsRange =
			typeof rows === 'number'
				? rows
				: algebra.range(rows[0], rows[1], true)
		let colRange =
			typeof columns === 'number'
				? columns
				: algebra.range(columns[0], columns[1], true)
		let indexes = algebra.index(rowsRange, colRange)
		let data = algebra.subset(matrix, indexes, value)
		return data
	}
	static deleteRows(matrix: Array2D, ...rows: number[]): Array2D {
		let filtered = matrix.filter((_, index) => {
			return !rows.includes(index)
		})
		return filtered
	}
	static deleteCols(matrix: Array2D, ...cols: number[]): Array2D {
		let filtered = matrix.map((row) => {
			return row.filter((_, index) => {
				return !cols.includes(index)
			})
		})
		return filtered
	}
	static size(matrix: Array2D | Array1D): [number, number] {
		return algebra.size(matrix) as [number, number]
	}
	static zeros(size: [number, number]): Array2D {
		return algebra.zeros(size) as Array2D
	}
}
