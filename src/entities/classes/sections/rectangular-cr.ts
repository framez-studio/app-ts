import { gravity } from '@/config'
import {
	IRectangularSectionCR,
	IRowReinforcement,
	IConcrete,
	IBarCR,
} from '@interfaces'

export class RectangularSectionCR implements IRectangularSectionCR {
	constructor(
		public b: number,
		public h: number,
		public material: IConcrete,
		private _reinforcement: IRowReinforcement[] = [],
	) {}
	
	get area(): number {
		return this.b * this.h
	}

	get inertiaZ(): number {
		return (1 / 12) * this.b * this.h ** 3
	}

	get young(): number {
		return this.material.young
	}

	get reinforcement(): IRowReinforcement[] {
		this.sortReinforcement()
		return this._reinforcement
	}

	get dmax(): number {
		this.sortReinforcement()
		return this.reinforcement[this.reinforcement.length - 1].distance
	}

	get weight(){
		return this.material.weight * this.area
	}

	get mass(){
		return this.weight/gravity
	}

	public as(d: number = this.dmax, sum: boolean = true) {
		if (sum == false) {
			const irow = this.findRowReinforcement(d)
			return this._reinforcement[irow].section.area
		} else {
			let a: number = 0
			this._reinforcement.forEach((row) => {
				if (row.distance <= d) {
					a = a + row.section.area * row.quantity
				}
			})
			return a
		}
	}

	public steelRatio(d: number = this.dmax, sum: boolean = true) {
		return this.as(d, sum) / (this.b * this.dmax)
	}

	public addRowReinforcement(d: number,quantity: number,BarCR: IBarCR): void {
		if (this.findRowReinforcement(d) === -1) {
			let row = { distance: d, quantity: quantity, section: BarCR }
			this._reinforcement.push(row)
		} else {
			this.swapRowReinforcement(d, quantity, BarCR)
		}
	}

    public findRowReinforcement(d: number):number{
        const f = (row: IRowReinforcement) => row.distance==d
        return this._reinforcement.findIndex(f)
    }



    public swapRowReinforcement(d:number,quantity: number,BarCR: IBarCR):void{
        const row: number=this.findRowReinforcement(d)
        if (row !=-1) {
            let rowi = {distance: d, quantity: quantity, section: BarCR}
            this._reinforcement[row] = rowi
        }
    }

    public deleteReinforcement():void{
        this._reinforcement=[]
    }

    public sortReinforcement():void{
        this._reinforcement.sort((a:IRowReinforcement,b:IRowReinforcement) => 
        (a.distance > b.distance) ? 1 : (a.distance < b.distance) ? -1 : 0)
    }

    public rotate180():RectangularSectionCR{
        let rnew: IRowReinforcement[] = []
        this._reinforcement.forEach(element => {
            let ei = element
            ei.distance = this.h - ei.distance
            rnew.push(ei)
        });
        return new RectangularSectionCR(this.b,this.h,this.material,rnew)
    }
}
