import { IElementContext } from '@interfaces'
import { useElementDynamicState } from './useElementDynamicState'
import { useElementState } from './useElementState'
import { useElementSteelState } from './useElementSteelState'
import { generateSectionFromContext } from '@utils/structure-generator'
import { MomentCurvatureFinal2Section } from '@utils/moment-curvature'
import { useEffect } from 'react'

export function useElementContextEmptyState(): IElementContext {
	const elementProps = useElementState()
	const elementSteel = useElementSteelState()
	const elementDynamics = useElementDynamicState()

	function autoUpdateMomentCurvature() {
		const section = generateSectionFromContext({
			elementProps,
			elementDynamics,
			elementSteel,
		})
		const { maxMoment, minMoment, maxCurv, minCurve } =
			MomentCurvatureFinal2Section(section)

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
		try {
			autoUpdateMomentCurvature()
		} catch (e) {
			console.log(e)
		}
	}, [elementDynamics.state.automatic])

	return { elementProps, elementSteel, elementDynamics }
}
