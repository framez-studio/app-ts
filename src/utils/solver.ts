import { Array2D } from '@types'
import { MatrixOperator as MatOp } from '@classes'

/**
 * Calculates the linear expression a*x = b.
 * @param a - nxn coefficient matrix
 * @param b - nx1 independent values vector
 * @returns A nx1 vector containing the solution of the system, the 'x' vector.
 */
export const solveLinearSystem = (a: Array2D, b: Array2D): Array2D => {
	let inverseCoefMatrix = MatOp.inverse(a)
	return MatOp.multiply(inverseCoefMatrix, b) as Array2D
}
