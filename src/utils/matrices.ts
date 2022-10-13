import { Array2D } from '../entities/interfaces/matrix.interface'

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
