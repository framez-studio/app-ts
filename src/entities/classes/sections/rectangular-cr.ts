import { IRectangularSectionCR } from "@/entities/interfaces/section.interface";
import { RowReinforcement } from "@/entities/types";
import { Concrete  } from "../others/material";
import { BarCR } from "./bar-cr";

export class RectangularSectionCR implements IRectangularSectionCR {
    constructor(
        private b: number,
        private h: number,
        private _material: Concrete,
        private _reinforcement: RowReinforcement[]
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
        return this._reinforcement
    }

    public addrowreinforcement(d:number,cant: number,BarCR: BarCR){
        this._reinforcement.push([d,cant,BarCR] as RowReinforcement)
    }

    public changerowreinforcement(d:number,cant: number,BarCR: BarCR){

    }

}