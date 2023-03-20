import { IStructure } from '@interfaces'
import { displaceStructure } from '@utils/elements'
export class StaticSolver {
	constructor() {}

	public static displacements(structure: IStructure) {
		if (this.isStable(structure)) {
			displaceStructure(structure)
		} else {
			throw 'ERROR: Structure is unstable'
		}
	}

	public static innerGIE(structure: IStructure) {
		let elements = structure.elements
		let b = elements.length
		let dtb = 0
		elements.forEach((e) => {
			let k = e.releases
			dtb = k.final.dx ? dtb + 1 : dtb
			dtb = k.final.dy ? dtb + 1 : dtb
			dtb = k.final.rz ? dtb + 1 : dtb
			dtb = k.initial.dx ? dtb + 1 : dtb
			dtb = k.initial.dy ? dtb + 1 : dtb
			dtb = k.initial.rz ? dtb + 1 : dtb
		})

		let nodes = structure.nodes
		let nl = 0
		let dta = 0
		nodes.forEach((n) => {
			if (n.isSupport()) {
				let v = n.constraints
				dta = v.dy ? dta : dta + 1
				dta = v.dx ? dta : dta + 1
				dta = v.rz ? dta : dta + 1
			} else {
				nl = nl + 1
			}
		})
		return 3 * b - (3 * nl + dtb + dta)
	}

	public static isStable(structure: IStructure) {
		return this.innerGIE(structure) >= 0
	}

	get forces() {
		return null
	}
}
