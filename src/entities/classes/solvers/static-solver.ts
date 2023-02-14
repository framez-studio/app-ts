import { Structure } from "../complex-elements/structure";
import {displaceStructure} from '@utils'
export class StaticSolver{
    constructor(
        public structure: Structure
    ){
        this.structure = structure
    }

    get displacements(){
        return displaceStructure(this.structure)
    }

    get forces(){
        return null
    }
    
    
}
