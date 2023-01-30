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

export class Hinge{
    collapsed: boolean = false
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
        if (moment > this.maxMoment) {
            this.collapsed = true
            this.typeCollapsed = 'positive'
        }
        if (moment<this.minMoment) {
            this.collapsed = true
            this.typeCollapsed = 'negative'
        }
        this.moment = moment
    }
}