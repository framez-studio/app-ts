import { IGeneratorConfig, IGeneratorElementConfig } from '@interfaces'
import { generatePorticSystem } from '@utils/structure-generator'

const material: IGeneratorElementConfig['material'] = {
	young: 17872000,
	weight: 24,
	fc: 21000,
	epsilon_max: 0.004,
}
const steel: IGeneratorElementConfig['steel'] = {
	fy: 500,
	young: 210000,
	rows: [],
}
const config: IGeneratorConfig = {
	levels: {
		count: 1,
		separation: 2,
	},
	spans: {
		count: 1,
		separation: 2,
	},
	columns: {
		section: {
			base: 0.2,
			height: 0.2,
		},
		load: 0,
		material,
		steel,
	},
	beams: {
		section: {
			base: 0.2,
			height: 0.2,
		},
		load: 20,
		material,
		steel,
	},
}

export const { structure: initialStructure } = generatePorticSystem(config)
