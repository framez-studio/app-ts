import { Section } from '@classes/sections/section'
import { MaterialType, IConcrete, ISteel } from '@interfaces'

export interface ISection<MT extends MaterialType> {
	readonly area: number
	readonly inertiaZ: number
	readonly mass: number
	readonly weight: number
	material: MT
}

export interface IRectangularSection<MT extends MaterialType>
	extends ISection<MT> {
	b: number
	h: number
}

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

export interface IRectangularRCSection extends IRectangularSection<IConcrete> {
	b: number
	reinforcement: IRowReinforcement[]
	readonly young: number
	readonly dmax: number
	as(d: number, sum: boolean): number
	steelRatio(d: number, sum: boolean): number
	addRowReinforcement(d: number, quantity: number, BarCR: IBarCR): void
	findRowReinforcement(d: number): number
	swapRowReinforcement(d: number, quantity: number, BarCR: IBarCR): void
	deleteReinforcement(): void
	sortReinforcement(): void
	rotate180(): void
}

export interface ICircularSection<MT extends MaterialType>
	extends ISection<MT> {
	diameter: number
}

export interface IBarCR extends ICircularSection<ISteel> {
	fy: number
	young: number
	readonly area: number
}
