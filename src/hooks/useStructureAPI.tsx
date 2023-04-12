import { useAppContext } from '@context/AppContext'
import {
	displaceStructure,
	getCapacityCurve,
	setStructureReactions,
} from '@utils/elements'

export function useStructureAPI() {
	const { state } = useAppContext()
	const { structure } = state

	function requestStructureSolver() {
		displaceStructure(structure)
		setStructureReactions(structure)
	}

	function getNode(node: { x: number; y: number }) {
		return structure.node(node)
	}

	function requestCapacityCurve(config: {
		direction: 'left' | 'right'
		node: { x: number; y: number }
		constants: { av: number; fv: number }
	}) {
		return getCapacityCurve({ structure, ...config })
	}

	return { requestStructureSolver, requestCapacityCurve, getNode }
}
