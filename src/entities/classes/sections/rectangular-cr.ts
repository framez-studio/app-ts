import { IRectangularSectionCR, RowReinforcement } from "@/entities/interfaces/section.interface";
import { Concrete  } from "../others/material";
import { BarCR } from "./bar-cr";

export class RectangularSectionCR implements IRectangularSectionCR {
    constructor(
        public b: number,
        private h: number,
        private _material: Concrete,
        private _reinforcement: RowReinforcement[] =[]
    ){}

    get area(): number{
        return this.b*this.h 
    };

    get inertiaZ(): number{
        return (1/12)*this.b*this.h**3
    };

    get material(): Concrete{
        return this._material
    }

    get young(): number{
        return this._material.young
    }
    
    get reinforcement():RowReinforcement[]{
        this.sort_reinforcement()
        return this._reinforcement
    }

    get dmax():number{
        this.sort_reinforcement()
        return this.reinforcement[this.reinforcement.length - 1].distance
    }

    public as(d:number = this.dmax,sum:boolean = true){
        if (sum == false) {
            const irow = this.find_rr(d)
            return this._reinforcement[irow].section.area
        }else{
            let a: number = 0
            this._reinforcement.forEach(row => {
                if (row.distance<=d) {
                    a = a + row.section.area * row.quantity
                }
            });
            return a
        }
    }

    public steel_ratio(d:number = this.dmax,sum: boolean = true){
        return this.as(d,sum)/(this.b*this.dmax)
    }
    
    public add_rr(d:number,quantity: number,BarCR: BarCR):void{
        if (this.find_rr(d) === -1) {
            let row = {distance: d, quantity: quantity, section: BarCR}
            this._reinforcement.push(row)
        } else {
            this.swap_rr(d,quantity,BarCR)
        }

    }

    public find_rr(d: number):number{
        const f = (row: RowReinforcement) => row.distance==d
        return this._reinforcement.findIndex(f)
    }

    public swap_rr(d:number,quantity: number,BarCR: BarCR):void{
        const row: number=this.find_rr(d)
        if (row !=-1) {
            let rowi = {distance: d, quantity: quantity, section: BarCR}
            this._reinforcement[row] = rowi
        }
    }

    public delete_reinforcement():void{
        this._reinforcement=[]
    }

    public sort_reinforcement():void{
        this._reinforcement.sort((a:RowReinforcement,b:RowReinforcement) => 
        (a.distance > b.distance) ? 1 : (a.distance < b.distance) ? -1 : 0)
    }
    
}