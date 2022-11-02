import { algebra } from '../../../utils/algebra'
import { IMatrixOperator } from '../../interfaces/matrix-operator.interface'
import { Array2D, Array1D } from '../../types'

export class MatrixOperator implements IMatrixOperator {
	private algebra = algebra
	sum(...matrices: (Array2D | Array1D)[]): Array2D | Array1D {
		let result = matrices.reduce((acc, value) => {
			return this.algebra.add(acc, value)
		})
		return result
	}
	subtract(...matrices: (Array2D | Array1D)[]): Array2D | Array1D {
		let result = matrices.reduce((acc, value) => {
			return this.algebra.subtract(acc, value)
		})
		return result
	}
	multiply(...matrices: (Array2D | Array1D | number)[]): Array2D | Array1D {
		let result = matrices.reduce((acc, value) => {
			return this.algebra.multiply(acc, value) as Array2D | Array1D
		}) as Array2D | Array1D
		return result
	}
	inverse(matrix: Array2D): Array2D {
		let result = this.algebra.inv(matrix)
		return result
	}
	transpose(matrix: Array2D): Array2D {
		let result = this.algebra.transpose(matrix)
		return result
	}
	subset(
		matrix: Array2D | Array1D,
		rows: number | [number, number],
		columns: number | [number, number],
	): number | (Array2D | Array1D) {
		let rowsRange =
			typeof rows === 'number'
				? rows
				: this.algebra.range(rows[0], rows[1], true)
		let colRange =
			typeof columns === 'number'
				? columns
				: this.algebra.range(columns[0], columns[1], true)
		let indexes = this.algebra.index(rowsRange, colRange)
		let data = this.algebra.subset(matrix, indexes)
		return data
	}
	replace(
		matrix: Array2D | Array1D,
		rows: number | [number, number],
		columns: number | [number, number],
		value: number | Array2D | Array1D,
	): Array2D | Array1D {
		let rowsRange =
			typeof rows === 'number'
				? rows
				: this.algebra.range(rows[0], rows[1], true)
		let colRange =
			typeof columns === 'number'
				? columns
				: this.algebra.range(columns[0], columns[1], true)
		let indexes = this.algebra.index(rowsRange, colRange)
		let data = this.algebra.subset(matrix, indexes, value)
		return data
	}
	deleteRows(matrix: Array2D, ...rows: number[]): Array2D {
		let filtered = matrix.filter((_, index) => {
			return !rows.includes(index)
		})
		return filtered
	}
	deleteCols(matrix: Array2D, ...cols: number[]): Array2D {
		let filtered = matrix.map((row) => {
			return row.filter((_, index) => {
				return !cols.includes(index)
			})
		})
		return filtered
	}
	size(matrix: Array2D | Array1D): [number, number] {
		return this.algebra.size(matrix) as [number, number]
	}
	zeros(size: [number, number]): Array2D {
		return this.algebra.zeros(size) as Array2D
	}
}
