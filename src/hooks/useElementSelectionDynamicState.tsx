import {
	IElementDynamicState,
	ISelectedElementDynamicStateHook,
} from '@interfaces'
import { useElementSelection } from './useElementSelection'
import { useElementDynamicState } from './useElementDynamicState'
import { MomentCurvatureFinal2Section } from '@utils/moment-curvature'
import { useEffect } from 'react'

export function useElementSelectionDynamicState(): ISelectedElementDynamicStateHook {
	const element = useElementSelection()
	const dynamicState = useElementDynamicState()
	const { state } = dynamicState

	function updateWeight(value: string) {
		dynamicState.updateWeight(value)
	}
	function updateCurvature(
		payload: Partial<IElementDynamicState['curvature']>,
	) {
		dynamicState.updateCurvature(payload)
	}
	function updateMoment(payload: Partial<IElementDynamicState['moment']>) {
		dynamicState.updateMoment(payload)
	}
	function toggleAutomatic() {
		dynamicState.toggleAutomatic()
	}
	function autoCalculateMomentCurvature() {
		const { maxMoment, minMoment, maxCurv, minCurve } =
			MomentCurvatureFinal2Section(element.section)
		updateCurvature({
			max: String(maxCurv),
			min: String(minCurve),
		})
		updateMoment({
			max: String(maxMoment),
			min: String(minMoment),
		})
	}
	useEffect(() => {
		if (!state.automatic) return
		if (element.section.reinforcement.length == 0) return
	}, [state.automatic, element.section])
	return {
		state,
		updateWeight,
		updateCurvature,
		updateMoment,
		toggleAutomatic,
	}
}
