import { useEffect } from 'react'
import { useStructureAPI } from '@hooks/useStructureAPI'
import { useElementSelection } from './useElementSelection'
import { useAppContext } from '@context/AppContext'
import { useElementState } from './useElementState'
import { ISelectedElementPropsStateHook } from '@interfaces'

export function useElementSelectionState(): ISelectedElementPropsStateHook {
	const { requestCanvasRedraw } = useAppContext()
	const { requestStructureSolver } = useStructureAPI()
	const element = useElementSelection()
	const elementState = useElementState()
	const { state } = elementState

	function updateYoung(newYoung: string) {
		element.section.material.young = Number(newYoung)
		elementState.updateYoung(newYoung)
		requestStructureSolver()
	}
	function updateFc(newFc: string) {
		element.section.material.fc = Number(newFc)
		elementState.updateFc(newFc)
		requestStructureSolver()
	}
	function updateEpsilon(newEpsilon: string) {
		element.section.material.epsilon_max = Number(newEpsilon)
		elementState.updateEpsilon(newEpsilon)
		requestStructureSolver()
	}
	function updateLoad(newLoad: string) {
		element.loads[0].load = Number(newLoad)
		elementState.updateLoad(newLoad)
		requestStructureSolver()
		requestCanvasRedraw()
	}
	function updateSectionDims(newDims: { base?: string; height?: string }) {
		const { sectionDims } = state
		let base = newDims.base || sectionDims.base
		let height = newDims.height || sectionDims.height
		element.section.b = Number(base)
		element.section.h = Number(height)
		elementState.updateSectionDims({ base, height })
		requestStructureSolver()
	}
	useEffect(() => elementState.assignElementState(element), [element])
	return {
		state,
		updateYoung,
		updateFc,
		updateSectionDims,
		updateLoad,
		updateEpsilon,
	}
}
