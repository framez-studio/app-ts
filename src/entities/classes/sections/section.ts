import { ISection } from '@interfaces'
import { Material } from '../others/material';

export abstract class Section implements ISection {
	abstract get area(): number
	abstract get inertiaZ(): number
	constructor(
		public material: Material
	){

	}
}

