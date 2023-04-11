/*
export class MomentCurvature{
    constructor(
        public mp: number,
        public curvp: number,
        public mn: number,
        public curvn: number
    ){
        this.mp = mp
        this.curvp = curvp
        this.mn = mn
        this.curvn = curvn 
    }
}
*/

import { IHinge } from "@interfaces/hinge.interface"

export class Hinge implements IHinge{
    isCollapsed: boolean = false
    positiveCollapsed: boolean = false
    negativeCollapsed: boolean = false
    moment: number = 0
    constructor(
        public maxMoment: number,
        public maxCurv: number,
        public minMoment: number,
        public minCurve: number,
        public type: "Moment-P" | "Moment" | 'Custom'
    ){
        this.maxMoment = maxMoment
        this.maxCurv = maxCurv
        this.minMoment = minMoment
        this.minCurve = minCurve
        this.type = type
    }
    
    /**
     * setMoment
     */
    public setMoment(moment: number) {
        if (moment >= this.maxMoment) {
            this.isCollapsed = true
            this.positiveCollapsed = true
        }
        if (moment<=this.minMoment) {
            this.isCollapsed = true
            this.negativeCollapsed = true
        }
        this.moment = moment
    }

    public resetHinge(){
        this.moment = 0
        this.isCollapsed = false
        this.positiveCollapsed = false
        this.negativeCollapsed = false
    }

    public setCollapse(isCollapsed: boolean){
        this.isCollapsed = isCollapsed
    }

    public setPositiveCollapse(value: boolean){
        this.positiveCollapsed=value
    }

    public setNegativeCollapse(value: boolean){
        this.negativeCollapsed=value
    }

    public copy(): IHinge{
        let h = new Hinge(this.maxMoment,this.maxCurv,this.minMoment,this.minCurve,this.type)
        h.setMoment(this.moment)
        h.setCollapse(this.isCollapsed)
        h.setNegativeCollapse(this.negativeCollapsed)
        h.setPositiveCollapse(this.positiveCollapsed)
        return h
    }
}