import { BarCR, Material } from "../classes"

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

export interface IRectangularSectionCR extends IRectangularSection{
	reinforcement: RowReinforcement[]
}

export interface CircularSection extends ISection{
	diameter: number
}