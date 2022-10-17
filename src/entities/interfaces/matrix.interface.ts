import { Matrix } from '../classes/matrices/matrix'

export type Array1D = number[]
export type Array2D = Array1D[]

// type OneOrTwoD<T extends Array1D | Array2D | number> = T extends Array2D
// 	? Array2D
// 	: Array1D

export interface IMatrix {
	readonly inverse: Matrix
	readonly transpose: Matrix
	add(value: Array1D | Array2D): Matrix
	subtract(value: Array1D | Array2D): Matrix
	multiplyBy(multiplier: number | Array1D | Array2D): Matrix
}
