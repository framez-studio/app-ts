import { Array2D, Array1D, stiffnessSubmatrices2DObject } from '@types'

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
	replace(
		matrix: Array2D | Array1D,
		rows: number | [number, number],
		columns: number | [number, number],
		value: number | Array2D | Array1D,
	): Array2D | Array1D
	size(matrix: Array2D | Array1D): [number, number]
	deleteRows(matrix: Array2D, ...rows: number[]): Array2D
	deleteCols(matrix: Array2D, ...cols: number[]): Array2D
	zeros(size: [number, number]): Array2D
}

export interface IStiffnessMatrixOperator extends IMatrixOperator {
	rotateMatrix(matrix: Array2D, angle: number): Array2D
	rotateVector(vector: Array2D, angle: number): Array2D
	submatrices(matrix: Array2D): stiffnessSubmatrices2DObject
	reduceDegs(
		type: 'matrix' | 'vector',
		matrix: Array2D,
		...degs: number[]
	): Array2D
}
