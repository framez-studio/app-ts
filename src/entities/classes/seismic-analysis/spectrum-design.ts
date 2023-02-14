export class spectrumDesign{
    public t0: number
    public tc: number
    public tl: number
    constructor(
        public av: number,
        public fv: number,
        public aa: number,
        public fa: number,
        public i: number
    ){
        this.t0 = 0.1 * (av*fv)/(aa*fa)
        this.tc = 0.48 * (av*fv)/(aa*fa)
        this.tl = 2.4*fv
    }

    public accelerationSpectrum(){

    }

    public sa(t: number, mode: 'fundamental' | 'other' = 'fundamental'){
        if (t<this.t0 && mode=='other') {
            return 2.5*this.aa*this.fa*this.i*(0.4 + 0.6 *(t/this.t0))
        }else{
            if (t<=this.tc) {
                return 2.5 * this.aa *this.fa * this.i
            }
            if (t>this.tc && t<=this.tl) {
                return (1.2*this.av*this.fv*this.i)/t
            }
            if (t>this.tl) {
                return (1.2*this.av*this.fv*this.tl*this.i)/(t**2)
            }
        }
        throw 'Error: SpectrumDesign: Cant determinate Sa'
    }
}