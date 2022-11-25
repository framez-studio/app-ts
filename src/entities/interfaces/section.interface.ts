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
	steelRatio(d:number,sum:boolean):number
	addRowReinforcement(d:number,quantity:number,BarCR: BarCR):void
	findRowReinforcement(d:number):number
	swapRowReinforcement(d:number,quantity:number,BarCR: BarCR):void
	deleteReinforcement():void
	sortReinforcement():void
}

export interface ICircularSection extends ISection{
	diameter: number
}