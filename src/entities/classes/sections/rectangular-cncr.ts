import { IRectangularSectionCR } from "@/entities/interfaces/section.interface";
import { Concrete } from "../others/material";

export class RectangularSectionCR implements IRectangularSectionCR {
    constructor(
        private b: number,
        private h: number,
        private _material: Concrete
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

    
}