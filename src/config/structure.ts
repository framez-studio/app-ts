import { IGeneratorConfig } from '@interfaces'
import { generatePorticSystem } from '@utils/structure-generator'

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
		material: {
			young: 17872000,
			weight: 24,
			fc: 21000,
			epsilon_max: 0.004,
		},
		section: {
			base: 0.2,
			height: 0.2,
		},
		load: 0,
	},
	beams: {
		material: {
			young: 17872000,
			weight: 24,
			fc: 21000,
			epsilon_max: 0.004,
		},
		section: {
			base: 0.2,
			height: 0.2,
		},
		load: 20,
	},
}

export const { structure: initialStructure } = generatePorticSystem(config)
