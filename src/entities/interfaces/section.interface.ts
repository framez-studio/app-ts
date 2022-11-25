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
	section: ISteelCircularSection
}

export interface IRowReinforcementMechanics {
	distance: number
	quantity: number
	section: ISteelCircularSection
	epsilon: number
	strength: number
	force: number
	moment: number
}

export interface IRectangularSectionCR extends IRectangularSection {
	b: number
	material: IConcrete
	reinforcement: IRowReinforcement[]
	readonly dmax: number
	as(d: number, sum: boolean): number
	steel_ratio(d: number, sum: boolean): number
	add_rr(d: number, quantity: number, BarCR: ISteelCircularSection): void
	find_rr(d: number): number
	swap_rr(d: number, quantity: number, BarCR: ISteelCircularSection): void
	delete_reinforcement(): void
	sort_reinforcement(): void
}

export interface ICircularSection extends ISection {
	diameter: number
}
export interface ISteelCircularSection extends ICircularSection {}
