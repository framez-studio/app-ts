import { Array2D } from '../entities/types'

/**
 * Creates a factorized by (E*I/L^3) stiffness matrix for a single element.
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
 * Creates a full stiffness matrix for a single element.
 * @param e - Young Modulus
 * @param l - Length
 * @param a - Area
 * @param i - Inertia
 * @returns An array containing the full local stiffness matrix.
 */
export const stiffness = (
	e: number,
	l: number,
	a: number,
	i: number,
): Array2D => {
	let eal = (e * a) / l
	let eil = (e * i) / l
	let eil2 = (e * i) / l ** 2
	let eil3 = (e * i) / l ** 3
	let matrix = [
		[eal, 0, 0, -eal, 0, 0],
		[0, 12 * eil3, 6 * eil2, 0, -12 * eil3, 6 * eil2],
		[0, 6 * eil2, 4 * eil, 0, -6 * eil2, 2 * eil],
		[-eal, 0, 0, eal, 0, 0],
		[0, -12 * eil3, -6 * eil2, 0, 12 * eil3, -6 * eil2],
		[0, 6 * eil2, 2 * eil, 0, -6 * eil2, 4 * eil],
	]
	return matrix
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
		[cos, sin, 0, 0, 0, 0],
		[-sin, cos, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0],
		[0, 0, 0, cos, sin, 0],
		[0, 0, 0, -sin, cos, 0],
		[0, 0, 0, 0, 0, 1],
	]
	return matrix
}

/**
 * Creates a Correction Matrix for an element.
 * @param l - Length
 * @param yi - Stiffiness factor of first node
 * @param yf - Stiffiness factor of second node
 * @returns An Array with the Correction Matrix
 */
export const correction = (l: number, yi: number, yf: number): Array2D => {
	let denom = 4 - yi * yf
	let common = ((6 / l) * (yi - yf)) / denom
	let matrix = [
		[1, 0, 0, 1, 0, 0],
		[
			0,
			(4 * yf - 2 * yi + yi * yf) / denom,
			(-2 * l * yi * (1 - yf)) / denom,
			0,
			(4 * yi - 2 * yf + yi * yf) / denom,
			(2 * l * yf * (1 - yi)) / denom,
		],
		[
			0,
			common,
			(3 * yi * (2 - yf)) / denom,
			0,
			common,
			(3 * yf * (2 - yi)) / denom,
		],
		[1, 0, 0, 1, 0, 0],
		[
			0,
			(4 * yf - 2 * yi + yi * yf) / denom,
			(-2 * l * yi * (1 - yf)) / denom,
			0,
			(4 * yi - 2 * yf + yi * yf) / denom,
			(2 * l * yf * (1 - yi)) / denom,
		],
		[
			0,
			common,
			(3 * yi * (2 - yf)) / denom,
			0,
			common,
			(3 * yf * (2 - yi)) / denom,
		],
	]
	return matrix
}
