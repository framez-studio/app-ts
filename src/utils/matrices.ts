import { Array2D } from '../entities/interfaces/matrix.interface'

/**
 * Creates a factorized stiffness matrix for a single element.
 * @param e - Young Modulus
 * @param l - Length
 * @param a - Area
 * @param i - Inertia
 * @returns An object containing the factorized matrix and its factor.
 */
export const factorizedStiffness = (
	e: number,
	l: number,
	a: number,
	i: number,
): { factor: number; matrix: Array2D } => {
	let ail2 = (a * l * l) / i
	let l2 = l ** 2
	let matrix = [
		[ail2, 0, 0, -ail2, 0, 0],
		[0, 12, 6 * l, 0, -12, 6 * l],
		[0, 6 * l, 4 * l2, 0, -6 * l, 2 * l2],
		[-ail2, 0, 0, ail2, 0, 0],
		[0, -12, -6 * l, 0, 12, -6 * l],
		[0, 6 * l, 2 * l2, 0, -6 * l, 4 * l2],
	]
	let factor = (e * i) / l ** 3
	return { factor, matrix }
}

/**
 * Creates a Transformation Matrix for a single element.
 * @param alpha - Inclination angle of the element from X Axis in Degrees.
 * @returns An Array with the Transformation Matrix
 */
export const transformation = (alpha: number): Array2D => {
	let sin = Math.sin((alpha * Math.PI) / 180)
	let cos = Math.cos((alpha * Math.PI) / 180)
	let matrix = [
		[cos, -sin, 0, 0, 0, 0],
		[sin, cos, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0],
		[0, 0, 0, cos, -sin, 0],
		[0, 0, 0, sin, cos, 0],
		[0, 0, 0, 0, 0, 1],
	]
	return matrix
}
