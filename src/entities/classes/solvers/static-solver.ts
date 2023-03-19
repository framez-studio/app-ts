import { IStructure } from '@interfaces'
import { displaceStructure } from '@utils'
export class StaticSolver {
	constructor(public structure: IStructure) {
		this.structure = structure
	}

	get displacements() {
		return displaceStructure(this.structure)
	}

	get forces() {
		return null
	}
}
