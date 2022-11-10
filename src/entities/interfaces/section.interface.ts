import { Material } from "../classes"

export interface ISection {
	readonly area: number
	readonly inertiaZ: number
	material: Material
}

export interface IRectangularSection extends ISection{

}

export interface IRectangularSectionCR extends IRectangularSection{

}

export interface CircularSection extends ISection{
	diameter: number
}