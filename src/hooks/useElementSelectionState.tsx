import { useEffect } from 'react'
import { useStructureAPI } from '@hooks/useStructureAPI'
import { useElementSelection } from './useElementSelection'
import { useAppContext } from '@context/AppContext'
import { useElementState } from './useElementState'

export function useElementSelectionState() {
	const { requestCanvasRedraw } = useAppContext()
	const { requestStructureSolver } = useStructureAPI()
	const element = useElementSelection()
	const elementState = useElementState()
	const { young, epsilon, load, sectionDims, response } = elementState.state

	function setYoung(newYoung: string) {
		element.section.material.young = Number(newYoung)
		elementState.updateYoung(newYoung)
		requestStructureSolver()
	}
	function setEpsilon(newEpsilon: string) {
		element.section.material.epsilon_max = Number(newEpsilon)
		elementState.updateEpsilon(newEpsilon)
		requestStructureSolver()
	}
	function setLoad(newLoad: string) {
		element.loads[0].load = Number(newLoad)
		elementState.updateLoad(newLoad)
		requestStructureSolver()
		requestCanvasRedraw()
	}
	function setSectionBase(base: string) {
		element.section.b = Number(base)
		elementState.updateSectionDims({ base })
		requestStructureSolver()
	}
	function setSectionHeight(height: string) {
		element.section.h = Number(height)
		elementState.updateSectionDims({ height })
		requestStructureSolver()
	}
	useEffect(() => elementState.assignElementState(element), [element])
	return {
		young,
		setYoung,
		sectionDims,
		setSectionBase,
		setSectionHeight,
		load,
		setLoad,
		response,
		epsilon,
		setEpsilon,
	}
}
