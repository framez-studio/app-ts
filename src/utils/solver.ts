import { Matrix } from '../entities/classes/matrices/matrix'
import { SMatrix } from '../entities/classes/matrices/Smatrix'
import { Array1D} from '../entities/interfaces/matrix.interface'

export let solverDisplacements = (kred: SMatrix, fef: Array1D | Matrix, p: Matrix)=>{
        let kinv = kred.inverse
        return kinv.multiplyBy(p.subtract(fef))
    
}