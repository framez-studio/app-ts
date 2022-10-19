import { ISMatrix } from '../../interfaces/s-matrix.interface'
import { Matrix } from './matrix'
import {
	factorizedStiffness,
	stiffness,
	transformation,
} from '../../../utils/matrices'
import { IMatrix } from '../../interfaces/matrix.interface'

export class SMatrix extends Matrix implements ISMatrix {
	/**
	 * Creates an instance of a Stiffness Matrix.
	 * @param {number} e - Young Modulus
	 * @param {number} l - Length
	 * @param {number} a - Area
	 * @param {number} i - Inertia
	 */
	constructor(
		private e: number,
		private l: number,
		private a: number,
		private i: number,
	) {
		let matrix = stiffness(e, l, a, i)
		super(matrix)
	}
	/**
	 * Returns both the factor and factorized version of the Stiffness Matrix.
	 * @return {*}  {{ factor: number; matrix: Array2D }}
	 */
	public factorized(): { factor: number; matrix: IMatrix } {
		const result = factorizedStiffness(this.e, this.l, this.a, this.i)
		return { factor: result.factor, matrix: new Matrix(result.matrix) }
	}
	/**
	 * Returns the full version of the Stiffness Matrix
	 * @return {*}  {Array2D}
	 */
	public full(): IMatrix {
		return new Matrix(this.data)
	}
	/**
	 * Prints on console the full matrix
	 */
	public print(): void {
		console.log(this.full().data)
	}
	public toGlobal(angle: number): IMatrix {
		const transf = new Matrix(transformation(angle))
		const result = transf.transpose.multiplyBy(this).multiplyBy(transf)
		return result
	}
}
