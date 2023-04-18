import { IElementContext } from '@interfaces'
import { useElementSelectionState } from './useElementSelectionState'
import { useElementSelectionSteelState } from './useElementSelectionSteelState'
import { useElementSelectionDynamicState } from './useElementSelectionDynamicState'
import { MomentCurvatureFinal2Section } from '@utils/moment-curvature'
import { useElementSelection } from './useElementSelection'
import { useEffect } from 'react'

export function useElementContextSelectionState(): IElementContext {
	const element = useElementSelection()
	const elementProps = useElementSelectionState()
	const elementSteel = useElementSelectionSteelState()
	const elementDynamics = useElementSelectionDynamicState()

	function autoUpdateMomentCurvature() {
		const { maxMoment, minMoment, maxCurv, minCurve } =
			MomentCurvatureFinal2Section(element.section)

		elementDynamics.updateCurvature({
			max: String(maxCurv),
			min: String(minCurve),
		})
		elementDynamics.updateMoment({
			max: String(maxMoment),
			min: String(minMoment),
		})
	}

	useEffect(() => {
		if (!elementDynamics.state.automatic) return
		if (element.section.reinforcement.length == 0) return
		try {
			autoUpdateMomentCurvature()
		} catch (e) {
			console.log(e)
		}
	}, [elementDynamics.state.automatic, element.section])

	return { elementProps, elementSteel, elementDynamics }
}
