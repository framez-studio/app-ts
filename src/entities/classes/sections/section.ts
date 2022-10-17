import { ISection } from '../../interfaces/section.interface'

export abstract class Section implements ISection {
	abstract get area(): number
	abstract get inertiaZ(): number
}

export class RectangularHSection implements ISection{
	area: number;
	inertiaZ: number;
	constructor(
		public b: number,
		public h: number,
		public tb: number,
		public th: number,
		public outer_radius?: number,
		public inner_radius?: number){
			this.area = 0
			this.inertiaZ = 0
	}
}