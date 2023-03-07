import { IFrameSystem } from "@/entities/interfaces/frame-system.interface"

export class FHE {
    /*
    TODO: Calculate fundamental period by first method especified NSR10 A.4.2-1
    */
    constructor(
         
    ){

    }

    public static _fundPeriod(method: 1|2|3,n?: number,h?: number){

        if (method==3 && n!=undefined) {
            return 0.1 * n
        }
        if (method==1) {
            throw 'Error in FHE: Fundamental Period: Method [1] is not avalaible yet'
        }
        if (method==2 && h!=undefined) {
            //Assign variables by Table A.4.2-1 NSR10 to Concrete Frame's System
            const ct = 0.047
            const alpha = 0.9
            return ct*(h)**alpha
        }
        throw 'Error in FHE: Fundamental Period'
    }

    public static _Cu(av:number,fv:number){
        return (1.75-1.2*av*fv)
    }

    public static fundamentalPeriod(method: 1|2|3,av:number,fv:number,n: number,h: number){
        if (n>12&&method==3) {method=2}
        const cu = this._Cu(av,fv)
        const ta = this._fundPeriod(2,n,h)
        const tmax = ta*cu
        let t = this._fundPeriod(method,n,h)
        if(t>=tmax){return t}else{return tmax}
    }

    public static _CvxKoeficent(fundamentalPeriod: number){
        let t = fundamentalPeriod
        if (t<=0.5) {return 0.5}else{
        if (t>0.5 && t<=2.5){return 0.75+0.5*t}else{
        return 2}}
    }

    public static _Cvxi(mi: number, hi: number, k: number, mihik: number) {
        return (((mi*hi)**k)/mihik)
    }

    public static _CvxMihik(k: number, masses: number[], h: number[]){
        let mihik = 0 
        if (masses.length == h.length && k!=null) {
            for (let i = 0; i < masses.length; i++) {
                let mi = masses[i];
                let hi = h[i]
                mihik = mihik + (mi*hi)**k
            }
            return mihik
        }
        throw 'Error in FHE: Cvx Coeficcent'
    }

    public static vs(sa:number,g:number,t:number){
        return sa*g*t
    }

    public static force(cvx: number, vs: number){
        return cvx*vs
    }

    public static setFHEinNodes(frame: IFrameSystem, directionX: 1 | -1, methodPeriod: 1|2|3 = 2,av:number,fv:number){
        let direction = directionX ? 1 : -1
        let nodes = frame.nodes
        let hmax = Math.max(...nodes.map((node) => node.coordinates('static').y).flat())
        let t = this.fundamentalPeriod(methodPeriod,av,fv,frame.numberLevels,hmax)
        let masses = [] as number[]
        let heights = [] as number[]

        //Se obtienen masas y alturas de los diferentes modos para obtener MiHiK
        nodes.forEach(n => {
            if (n.isSupport()) {
                
            } else {
                masses.push(n.nodeMass)
                heights.push(n.coordinates('static').y)
            }
        });

        if (masses.length == 0) {
            throw 'ERROR: setFHEinNodes: it doesnt exist nodes with mass'
        }
        if (heights.length == 0) {
            throw 'ERROR: setFHEinNodes: node heights with mass'
        }

        let k = this._CvxKoeficent(t)
        let mihik = this._CvxMihik(k,masses,heights)

        nodes.forEach(n => {
            let cvxn = this._Cvxi(n.nodeMass,n.coordinates('static').y,k,mihik)
            n.addLoads({fx: cvxn * direction})
        });

    }





    
}