import { Array2D, stiffnessSubmatrices2DObject } from '@types'
import { MatrixGenerator as MatGen, MatrixOperator } from '@classes'

export class SMatrixOperator extends MatrixOperator {
	static rotateMatrix(matrix: Array2D, angle: number): Array2D {
		let transf = MatGen.transformation(angle)
		let transfT = this.transpose(transf)
		return this.multiply(transfT, matrix, transf) as Array2D
	}
	static rotateVector(vector: Array2D, angle: number): Array2D {
		let transf = MatGen.transformation(angle)
		let transfT = this.transpose(transf)
		return this.multiply(transfT, vector) as Array2D
	}
	static submatrices(matrix: Array2D): stiffnessSubmatrices2DObject {
		let ii = this.subset(matrix, [0, 2], [0, 2]) as Array2D
		let ij = this.subset(matrix, [0, 2], [3, 5]) as Array2D
		let ji = this.subset(matrix, [3, 5], [0, 2]) as Array2D
		let jj = this.subset(matrix, [3, 5], [3, 5]) as Array2D
		return { ii, ij, ji, jj }
	}
	static reduceDegs(
		type: 'matrix' | 'vector',
		matrix: Array2D,
		...degs: number[]
	): Array2D {
		let initialFilter = this.deleteRows(matrix, ...degs)
		if (type === 'vector') return initialFilter
		return this.deleteCols(initialFilter, ...degs)
	}
}
