import { IMaterial, IConcrete } from '@interfaces'

export interface ISection {
	readonly area: number
	readonly inertiaZ: number
	material: IMaterial
}

export interface IRectangularSection extends ISection {}

export interface IRowReinforcement {
	distance: number
	quantity: number
	section: IBarCR
}

export interface IRowReinforcementMechanics {
	distance: number
	quantity: number
	section: IBarCR
	epsilon: number
	strength: number
	force: number
	moment: number
}

export interface IRectangularSectionCR extends IRectangularSection {
	b: number
	material: IConcrete
	reinforcement: IRowReinforcement[]
	readonly young: number
	readonly dmax: number
	as(d:number,sum:boolean): number
	steelRatio(d:number,sum:boolean):number
	addRowReinforcement(d:number,quantity:number,BarCR: IBarCR):void
	findRowReinforcement(d:number):number
	swapRowReinforcement(d:number,quantity:number,BarCR: IBarCR):void
	deleteReinforcement():void
	sortReinforcement():void
}

export interface ICircularSection extends ISection{
	diameter: number
}

export interface IBarCR extends ICircularSection {
	readonly fy: number
	readonly young: number
}
