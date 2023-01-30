export class FHE{
    /*
    TODO: Calculate fundamental period by first method especified in NSR10 A.4.2-1
    */
    constructor(
         
    ){

    }

    private _fundPeriod(method: 1|2|3,n?: number,h?: number){

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

    private _Cu(av:number,fv:number){
        return (1.75-1.2*av*fv)
    }

    public fundamentalPeriod(method: 1|2|3,av:number,fv:number,n: number,h: number){
        if (n>12&&method==3) {method=2}
        const cu = this._Cu(av,fv)
        const ta = this._fundPeriod(2,h=h)
        const tmax = ta*cu
        let t = this._fundPeriod(method,n,h)
        if(t>=tmax){return t}else{return tmax}
    }

    public Cvx(fundamentalPeriod: number, masses: [number], h: [number]){
        let t = fundamentalPeriod
        let k: number | null = null
        if (t<=0.5) {k=0.5}
        if (t>0.5 && t<=2.5) {k=0.75+0.5*t}
        if (t>2.5) {k=2}
        let mihik = 0
        if (masses.length == h.length && k!=null) {
            for (let i = 0; i < masses.length; i++) {
                let mi = masses[i];
                let hi = h[i]
                mihik = mihik + (mi*hi)**k
            }
            let cvx = []
            for (let i = 0; i < masses.length; i++) {
                let mi = masses[i];
                let hi = h[i]
                cvx.push(((mi*hi)**k)/mihik)
            }
            return cvx
        }
        throw 'Error in FHE: Cvx Coeficcent'
    }
    
    public vs(sa:number,g:number,t:number){
        return sa*g*t
    }

    public force(cvx: number, vs: number){
        return cvx*vs
    }




}