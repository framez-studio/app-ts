import { ISection } from '../../interfaces/section.interface'

export abstract class Section implements ISection {
	abstract get area(): number
	abstract get inertiaZ(): number
}

export class RectangularHSection extends Section{
	constructor(
		private b: number,
		private h: number,
		private tb: number,
		private th: number,
		){
		super();
	}

	get area(): number {
		return (this.b * this.h)-((this.b-this.tb)*(this.h-this.th));
	}
	get inertiaZ(): number {
		return (this.b * this.h)-((this.b-this.tb)*(this.h-this.th))
	}
	
}