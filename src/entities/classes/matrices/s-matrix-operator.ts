import { Array2D } from '../../types'
import { IMatrixGenerator } from '../../interfaces/matrix-generator.interface'
import { ISMatrixOperator } from '../../interfaces/matrix-operator.interface'
import { MatrixGenerator } from './matrix-generator'
import { MatrixOperator } from './matrix-operator'

export class SMatrixOperator
	extends MatrixOperator
	implements ISMatrixOperator
{
	private matGen: IMatrixGenerator = new MatrixGenerator()

	rotate(matrix: Array2D, angle: number): Array2D {
		let transf = this.matGen.transformation(angle)
		let transfT = this.transpose(transf)
		return this.multiply(transfT, matrix, transf) as Array2D
	}
}
