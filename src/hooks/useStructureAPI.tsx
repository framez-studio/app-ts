import { useAppContext } from '@context/AppContext'
import { displaceStructure, setStructureReactions } from '@utils/elements'

export function useStructureAPI() {
	const { state } = useAppContext()
	const { structure } = state

	function requestStructureSolver() {
		displaceStructure(structure)
		setStructureReactions(structure)
	}
	return { requestStructureSolver }
}
