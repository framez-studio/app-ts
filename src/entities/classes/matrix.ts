import { algebra } from '../../utils/algebra'
import { Array1D, Array2D, IMatrix } from '../interfaces/matrix.interface'

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
	subtract(value: Array2D | Array1D): Matrix {
		let result = this.algebra.subtract(this.matrix, value)
		return new Matrix(result)
	}
	/**
	 * Returns Value of the operation 'this * multiplier' as a new instance.
	 * @param multiplier - Value to multiply.
	 */
	multiplyBy(multiplier: number | Array2D | Array1D): Matrix {
		let result = this.algebra.multiply(this.matrix, multiplier) as
			| Array2D
			| Array1D
		return new Matrix(result)
	}
}
