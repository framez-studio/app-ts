import { ISection } from '@interfaces'

export abstract class Section implements ISection {
	abstract get area(): number
	abstract get inertiaZ(): number
}
