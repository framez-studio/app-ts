import { ISection, IMaterial } from '@interfaces'

export abstract class Section implements ISection {
	abstract get area(): number
	abstract get inertiaZ(): number
	abstract get mass():number
	abstract get weight(): number
	constructor(public material: IMaterial) {}
}
