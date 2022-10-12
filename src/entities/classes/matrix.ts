import math, { Matrix as BaseMatrix, create, all, MathCollection } from 'mathjs'
import { IMatrix } from '../interfaces/matrix.interface'

export class Matrix implements IMatrix<BaseMatrix> {
    private algebra = create(all, {})
    private matrix: BaseMatrix

    constructor(arr: 'sparse' | 'dense') {
        this.matrix = this.algebra.matrix(arr)
    }
    get content(): BaseMatrix {
        return this.matrix
    }
    get size(): MathCollection {
        return math.size(this.matrix)
    }
    get inverse(): BaseMatrix {
        return math.inv(this.matrix)
    }
    get transpose(): BaseMatrix {
        return math.transpose(this.matrix)
    }
}
