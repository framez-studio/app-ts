import { ISMatrix } from '../interfaces/sMatrix.interface'
import { Matrix } from './matrix'
import { factorizedStiffness } from '../../utils/matrices'

export class SMatrix extends Matrix implements ISMatrix {
	private factor: number
	/**
	 * Creates an instance of a Stiffness Matrix.
	 * @param {number} e - Young Modulus
	 * @param {number} l - Length
	 * @param {number} a - Area
	 * @param {number} i - Inertia
	 */
	constructor(e: number, l: number, a: number, i: number) {
		let { factor, matrix } = factorizedStiffness(e, l, a, i)
		super(matrix)
		this.factor = factor
	}
	/**
	 * Returns both the factor and factorized version of the Stiffness Matrix.
	 * @return {*}  {{ factor: number; matrix: Array2D }}
	 */
	public factorized(): { factor: number; matrix: Matrix } {
		return { factor: this.factor, matrix: new Matrix(this.data) }
	}
	/**
	 * Returns the full version of the Stiffness Matrix
	 * @return {*}  {Array2D}
	 */
	public full(): Matrix {
		return this.multiplyBy(this.factor)
	}
	/**
	 * Prints on console the full matrix
	 */
	public print(): void {
		console.log(this.full().data)
	}
}
