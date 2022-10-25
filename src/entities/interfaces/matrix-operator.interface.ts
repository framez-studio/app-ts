import { Array2D, Array1D } from '../types'

export interface IMatrixOperator {
	sum(...matrices: (Array2D | Array1D)[]): Array2D | Array1D
	subtract(...matrices: (Array2D | Array1D)[]): Array2D | Array1D
	multiply(...matrices: (Array2D | Array1D | number)[]): Array2D | Array1D
	inverse(matrix: Array2D): Array2D
	transpose(matrix: Array2D): Array2D
	subset(
		matrix: Array2D | Array1D,
		rows: number | [number, number],
		columns: number | [number, number],
	): number | (Array2D | Array1D)
	size(matrix: Array2D | Array2D): [number, number]
	zeros(size: [number, number]): Array2D
}

export interface ISMatrixOperator extends IMatrixOperator {
	rotate(matrix: Array2D, angle: number): Array2D
}
