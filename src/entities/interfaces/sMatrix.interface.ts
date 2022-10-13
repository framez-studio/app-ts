import { Matrix } from '../classes/matrix'

export interface ISMatrix {
	factorized(): { factor: number; matrix: Matrix }
	full(): Matrix
}
