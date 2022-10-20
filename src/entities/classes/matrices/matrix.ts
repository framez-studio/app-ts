import { algebra } from '../../../utils/algebra'
import { Array1D, Array2D, IMatrix } from '../../interfaces/matrix.interface'

export class Matrix implements IMatrix {
	private algebra = algebra
	private matrix: Array2D | Array1D
	/**
	 * Base class for all Matrices of the project.
	 * @param arr - Array with Matrix Data
	 */
	constructor(arr: Array2D | Array1D) {
		this.matrix = arr
	}
	/**
	 * Returns the data inside the matrix as an Array.
	 */
	get data(): Array2D | Array1D {
		return this.matrix
	}
	/**
	 * Returns a new instance with the inversed matrix.
	 * @readonly
	 */
	get inverse(): Matrix {
		let result = this.algebra.inv(this.matrix as Array2D)
		return new Matrix(result)
	}
	/**
	 * Returns a new instance with the transposed matrix.
	 * @readonly
	 */
	get transpose(): Matrix {
		let result = this.algebra.transpose(this.matrix)
		return new Matrix(result)
	}
	/**
	 * Returns the value of the operation 'this + value' as a new instance.
	 * @param value - Value to be added.
	 */
	add(value: Array2D | Array1D): Matrix {
		let result = this.algebra.add(this.matrix, value)
		return new Matrix(result)
	}
	/**
	 * Returns Value of the operation 'this - value' as a new instance.
	 * @param value - Value to be subtracted.
	 */
	subtract(value: Array2D | Array1D | Matrix): Matrix {
		let result: Array1D | Array2D
		if (value instanceof Matrix) {
			result = this.algebra.subtract(this.matrix, value.data)
		} else {
			result = this.algebra.subtract(this.matrix, value)
		}
		return new Matrix(result)
	}
	/**
	 * Returns Value of the operation 'this * multiplier' as a new instance.
	 * @param multiplier - Value to multiply.
	 */
	multiplyBy(multiplier: number | Array2D | Array1D | Matrix): Matrix {
		let result: Array1D | Array2D
		if (multiplier instanceof Matrix) {
			result = this.algebra.multiply(this.matrix, multiplier.data) as
				| Array2D
				| Array1D
		} else {
			result = this.algebra.multiply(this.matrix, multiplier) as
				| Array2D
				| Array1D
		}
		return new Matrix(result)
	}
	/**
	 *
	 * @param n Number of decimals default 0
	 * @returns Rounded matrix with n decimals
	 */
	round(n: number = 0): Matrix {
		return new Matrix(this.algebra.round(this.matrix, n))
	}
	/**
	 * Extract data from a given a range.
	 * All indexes are zero based.
	 * @param rows - The number of the row (or range of rows when an array is provided) to extract the data
	 * @param columns - The number of the column (or range of columns when an array is provided) to extract the data
	 * @returns - New Matrix instance with the data
	 */
	subset(
		rows: number | [number, number],
		columns: number | [number, number],
	): IMatrix | number {
		let rowsRange =
			typeof rows == 'number'
				? rows
				: this.algebra.range(rows[0], rows[1], true)
		let colRange =
			typeof columns == 'number'
				? columns
				: this.algebra.range(columns[0], columns[1], true)
		let indexes = this.algebra.index(rowsRange, colRange)
		let data = this.algebra.subset(this.data, indexes)
		return new Matrix(data)
	}
}
