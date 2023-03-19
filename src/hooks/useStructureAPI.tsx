import { displaceStructure, setStructureReactions } from '@utils'
import { useAppContext } from '@context/AppContext'

export function useStructureAPI() {
	const { state } = useAppContext()
	const { structure } = state

	function requestStructureSolver() {
		displaceStructure(structure)
		setStructureReactions(structure)
	}
	return { requestStructureSolver }
}
