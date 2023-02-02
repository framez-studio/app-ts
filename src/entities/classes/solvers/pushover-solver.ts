import { IElement, INode } from "@/entities/interfaces";
import { initialOrFinal } from "@/entities/types";
import { max } from "mathjs";
import { Structure } from "../complex-elements/structure";
import { Hinge } from "../others/moment-curvature";


export class PushoverSolver{
    private static _statusAnalysis: boolean = false
    constructor(

    ){

    }

    public static statusAnalysis(){
        return this._statusAnalysis
    }

    private static stepPushover(structure: Structure){
        structure.displacements
        let cfactors = collapseFactorStructure(structure)
        if(cfactors != undefined){
            let cfValues = cfactors.map(row => row[2])
            let maxCf = max(...cfValues)
            let i = cfValues.indexOf(maxCf)
            cfactors[i][0].release(cfactors[i][1],"rz")
        }
    }

    public static runAnalysis(): void{
        this._statusAnalysis = true
    }

}



const collapseFactor = (moment: number,hinge: Hinge)=>{
    if (moment!=0 && hinge.collapsed) {
        let hingeMoment = hinge.moment
        let failMoment = hingeMoment > 0 ? hinge.maxMoment : hinge.minMoment
        let residualMoment: number
        if(hingeMoment==0){
            residualMoment = failMoment
        }else{
            residualMoment = failMoment - hingeMoment
        }
        return residualMoment/moment
    }else {return undefined}
}

const collapseFactorElement = (
    element: IElement,
    node: initialOrFinal,
    moment:number
    )=>{
        let hinge = element.getHinge(node)
        if(hinge!=undefined){
            return collapseFactor(moment,hinge)
        }else{return undefined}
}

const collapseFactorStructure = (structure: Structure)=>{
    let cfactors: [[IElement,initialOrFinal,number]] | undefined
    structure.elements.forEach(element => {
        let mi = element.forces[2][0]
        let mf = element.forces[5][0]
        let cfi = collapseFactorElement(element,'initial',mi)
        let cff = collapseFactorElement(element,'final',mf)
        if (cfi!=undefined) {
            if (cfactors!=undefined) {
                cfactors.push([element,'initial',cfi])
            }else{
                cfactors=[[element,'initial',cfi]]
            }
        }
        if (cff!=undefined) {
            if (cfactors!=undefined) {
                cfactors.push([element,'final',cff])
            }else{
                cfactors=[[element,'final',cff]]
            }
        }
    });
    return cfactors
}

