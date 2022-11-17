import { BarCR, Material } from "../classes"
import { Concrete } from "../classes/others/material"

export interface ISection {
	readonly area: number
	readonly inertiaZ: number
	material: Material
}

export interface IRectangularSection extends ISection{

}

export interface RowReinforcement {
	distance: number
	quantity: number
	section: BarCR 
}

export interface RowReinforcementMechanics {
	distance: number
	quantity: number
	section: BarCR 
	epsilon: number
	strength: number
	force: number
	moment: number
}

export interface IRectangularSectionCR extends IRectangularSection{
	b:number
	material: Concrete
	reinforcement: RowReinforcement[]
	readonly dmax: number
	as(d:number,sum:boolean): number
	steel_ratio(d:number,sum:boolean):number
	add_rr(d:number,quantity:number,BarCR: BarCR):void
	find_rr(d:number):number
	swap_rr(d:number,quantity:number,BarCR: BarCR):void
	delete_reinforcement():void
	sort_reinforcement():void
}

export interface CircularSection extends ISection{
	diameter: number
}