import { create, all } from 'mathjs'
import { Array1D, Array2D, IMatrix } from '../interfaces/matrix.interface'

const algebraLibrary = create(all, {})

export class Matrix implements IMatrix {
	private algebra = algebraLibrary
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
	 * @returns
	 */
	get data(): Array2D | Array1D {
		return this.matrix
	}
	/**
	 * Returns a new instance with the inversed matrix.
	 * @readonly
	 * @type {Array2D}
	 * @memberof Matrix
	 */
	get inverse(): Matrix {
		let result = this.algebra.inv(this.matrix as Array2D)
		return new Matrix(result)
	}
	/**
	 * Returns a new instance with the transposed matrix.
	 * @readonly
	 * @type {Array2D}
	 * @memberof Matrix
	 */
	get transpose(): Matrix {
		let result = this.algebra.transpose(this.matrix)
		return new Matrix(result)
	}
	/**
	 * Sum operator
	 * @param value
	 * @returns Value of the operation 'this + value' as a new instance.
	 */
	add(value: Array2D | Array1D): Matrix {
		let result = this.algebra.add(this.matrix, value)
		return new Matrix(result)
	}
	/**
	 * Subtract operator
	 * @param value
	 * @returns Value of the operation 'this - value' as a new instance.
	 */
	subtract(value: Array2D | Array1D): Matrix {
		let result = this.algebra.subtract(this.matrix, value)
		return new Matrix(result)
	}
	/**
	 * Multiply operator
	 * @param multiplier - Value to multiply
	 * @returns Value of the operation 'this * multiplier' as a new instance.
	 */
	multiplyBy(multiplier: number | Array2D | Array1D): Matrix {
		let result = this.algebra.multiply(this.matrix, multiplier) as
			| Array2D
			| Array1D
		return new Matrix(result)
	}
}
