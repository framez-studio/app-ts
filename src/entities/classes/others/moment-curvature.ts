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

import { IHinge } from "@/entities/interfaces/hinge.interface"

export class Hinge implements IHinge{
    isCollapsed: boolean = false
    typeCollapsed: string | undefined = undefined
    moment: number = 0
    constructor(
        public maxMoment: number,
        public maxCurv: number,
        public minMoment: number,
        public minCurve: number,
        public type: "Moment-P" | "Moment"
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
            this.typeCollapsed = 'positive'
        }
        if (moment<=this.minMoment) {
            this.isCollapsed = true
            this.typeCollapsed = 'negative'
        }
        this.moment = moment
    }

    public resetHinge(){
        this.moment = 0
        this.isCollapsed = false
        this.typeCollapsed = undefined
    }
}