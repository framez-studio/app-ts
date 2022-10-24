import { Array2D, Array1D, degsOfFreedom2DArray } from '../../types'
import { IMatrixGenerator } from '../../interfaces/matrix-generator.interface'
import { IMatrixOperator } from '../../interfaces/matrix-operator.interface'
import { MatrixOperator } from './matrix-operator'
import { stiffness, transformation } from '../../../utils/matrices'

export class MatrixGenerator implements IMatrixGenerator {
	private MatOp: IMatrixOperator = new MatrixOperator()
	/**
	 * Generates a full Stiffness Matrix for a 2D member
	 * @param e - Young Modulus
	 * @param l - Length
	 * @param a - Area
	 * @param i - Inertia
	 * @param degs - Degs of Freedom releases Array [dx1, dy1, rz1, dx2, dy2, rz2] (by default, all values are false)
	 * @returns - The Stiffness Matrix as an Array2D type object
	 */
	stiffness(
		e: number,
		l: number,
		a: number,
		i: number,
		degs: degsOfFreedom2DArray = [false, false, false, false, false, false],
	): Array2D {
		let matrix = stiffness(e, l, a, i)
		degs.forEach((deg, index) => {
			if (deg) {
				let k1 = this.MatOp.subset(matrix, [0, 5], index) as Array2D
				let k2 = this.MatOp.subset(matrix, index, [0, 5]) as Array1D
				let k3 = this.MatOp.subset(matrix, index, index) as number
				let factor = this.MatOp.multiply(k1, 1 / k3, k2) as Array2D
				matrix = this.MatOp.subtract(matrix, factor) as Array2D
			}
		})
		return matrix
	}
	/**
	 * Generates a coordinates Transformation Matrix for a 2D Stiffness Matrix
	 * @param alpha - Inclination angle from X axis (counter-clockwise)
	 * @returns - The transformation matrix as an Array2D object
	 */
	transformation(alpha: number): Array2D {
		return transformation(alpha)
	}
}
