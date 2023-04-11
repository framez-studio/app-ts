import { useAppContext } from '@context/AppContext'
import { displaceStructure, setStructureReactions } from '@utils/elements'

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

	function requestStructurePushover(config: {
		direction: 'left' | 'right'
		node: { x: number; y: number }
		constants: { av: number; fv: number }
	}) {
		console.log('solving pushover at useStructureAPI')
	}

	return { requestStructureSolver, requestStructurePushover, getNode }
}
