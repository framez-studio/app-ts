import { Array2D, degsOfFreedom2DArray } from '@types'

export interface IMatrixGenerator {
	transformation(alpha: number): Array2D
	stiffness(
		e: number,
		l: number,
		a: number,
		i: number,
		degs?: degsOfFreedom2DArray,
	): Array2D
}
