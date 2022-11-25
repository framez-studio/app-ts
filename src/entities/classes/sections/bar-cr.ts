import { ICircularSection } from "@/entities/interfaces/section.interface";
import { pi } from "@/utils/algebra";
import { Steel } from "../others/material";

export class BarCR implements ICircularSection{
    constructor(public diameter: number, public area: number, public material: Steel){
        this.diameter = diameter
        this.material = material
        this.area = area
    }

    get inertiaZ(): number{
        return 0.25 * pi * (this.diameter*0.5)**4
    }

    get young() : number {
        return this.material.young
    }

    get fy(): number{
        return this.material.fy
    }

}