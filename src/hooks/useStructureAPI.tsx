import { useAppContext } from '@context/AppContext'
import { displaceStructure, setStructureReactions } from '@utils/elements'
import {
	getCapacityCurve,
	getPlasticizingSequence,
	resetPushover,
} from '@utils/pushover'

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

	function requestPushoverSolver(config: {
		direction: 'left' | 'right'
		node: { x: number; y: number }
		constants: { av: number; fv: number }
	}) {
		const curve = getCapacityCurve({ structure, ...config })
		const sequence = getPlasticizingSequence()
		resetPushover()
		return { curve, sequence }
	}

	return {
		structure,
		requestStructureSolver,
		requestPushoverSolver,
		getNode,
	}
}
