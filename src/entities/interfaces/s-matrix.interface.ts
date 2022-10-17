import { Matrix } from '../classes/matrices/matrix'

export interface ISMatrix {
	factorized(): { factor: number; matrix: Matrix }
	full(): Matrix
}
