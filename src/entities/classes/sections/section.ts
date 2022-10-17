import { ISection } from '../../interfaces/section.interface'

export abstract class Section implements ISection {
	abstract get area(): number
	abstract get inertiaZ(): number
}
