import { Matrix } from '../entities/classes/matrices/matrix'
import { SMatrix } from '../entities/classes/matrices/Smatrix'
import { Array1D} from '../entities/interfaces/matrix.interface'

/**
 * 
 * @param kred Reduced stiffnes matrix
 * @param fef Element extreme forces
 * @param p Element punctual loads
 * @returns Displacements matrix
 */
export let solverDisplacements = (kred: SMatrix, fef: Array1D | Matrix, p: Matrix) =>{
        let kinv = kred.inverse
        let result = kinv.multiplyBy(p.subtract(fef))
        result = result.round(6)
        return result as Matrix
}
let kred = new Matrix([[20517,-6652,619],[-6652,9003,-610],[619,-610,34370]]) as SMatrix
let p = new Matrix([0,0,75])
let fef = [0,30,-150]
let displacements = solverDisplacements(kred,fef,p)
console.log(displacements)