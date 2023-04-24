import {
	IFrameSystem,
	IGeneratorConfig,
	IGeneratorElementConfig,
} from '@interfaces'
import { generateFramezSystem } from '@utils/structure-generator'

const material: IGeneratorElementConfig['material'] = {
	young: 17872000,
	weight: 24,
	fc: 21000,
	epsilon_max: 0.003,
}
const beamsSteel: IGeneratorElementConfig['steel'] = {
	fy: 420000,
	young: 200000,
	rows: [
		{ diameter: 0.015875, distance: 0.045, quantity: 4 },
		{ diameter: 0.015875, distance: 0.355, quantity: 3 },
	],
}
const columnsSteel: IGeneratorElementConfig['steel'] = {
	fy: 420000,
	young: 200000,
	rows: [
		{ diameter: 0.015875, distance: 0.045, quantity: 4 },
		{ diameter: 0.015875, distance: 0.13, quantity: 2 },
		{ diameter: 0.015875, distance: 0.215, quantity: 2 },
		{ diameter: 0.015875, distance: 0.3, quantity: 4 },
	],
}
const config: IGeneratorConfig = {
	levels: [2, 2],
	spans: [2, 2],
	columns: {
		section: {
			base: 0.35,
			height: 0.35,
		},
		load: 0,
		material,
		steel: columnsSteel,
		momentCurvature: {
			automatic: false,
			moment: {
				min: -120.2854,
				max: 118.42,
			},
			curvature: {
				min: -0.008,
				max: 0.008,
			},
		},
	},
	beams: {
		section: {
			base: 0.3,
			height: 0.4,
		},
		load: 0,
		material,
		steel: beamsSteel,
		momentCurvature: {
			automatic: false,
			moment: {
				min: -106.4797,
				max: 80.9312,
			},
			curvature: {
				min: -0.008,
				max: 0.008,
			},
		},
	},
}

const structure = {
	instance: generateFramezSystem(config).structure,
}

export function setStructureInstance(newStructure: IFrameSystem) {
	structure.instance = newStructure
	// console.log('instance setter', structure.instance)
}

export function getStructureInstance() {
	// console.log('instance getter', structure.instance)
	return structure.instance
}
