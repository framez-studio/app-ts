import { IMatrix } from './matrix.interface'

export type coordinateSystem = 'local' | 'global'

export interface ISMatrix {
	factorized(): { factor: number; matrix: IMatrix }
	full(): IMatrix
}
