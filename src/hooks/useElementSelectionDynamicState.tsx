import {
	IElementDynamicState,
	ISelectedElementDynamicStateHook,
} from '@interfaces'
import { useElementSelection } from './useElementSelection'
import { useElementDynamicState } from './useElementDynamicState'
import {
	MomentCurvatureFinal2Section,
	assignHinges2Element,
} from '@utils/moment-curvature'
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
		if (!state.automatic) {
			const curvature = { ...state.curvature, ...payload }
			const { moment } = state
			assignMomentCurvature({ moment, curvature })
		}
	}
	function updateMoment(payload: Partial<IElementDynamicState['moment']>) {
		dynamicState.updateMoment(payload)
		if (!state.automatic) {
			const moment = { ...state.moment, ...payload }
			const { curvature } = state
			assignMomentCurvature({ moment, curvature })
		}
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
	function assignMomentCurvature(values: {
		moment: IElementDynamicState['moment']
		curvature: IElementDynamicState['curvature']
	}) {
		const { moment, curvature } = values
		if (!isMomentCurvatureFull({ moment, curvature })) return
		const hingeType = element.inclination === 90 ? 'Moment-P' : 'Moment'
		assignHinges2Element({
			element,
			hingeType: 'Custom',
			node: 'both',
			moment: { max: Number(moment.max), min: Number(moment.min) },
			curvature: {
				max: Number(curvature.max),
				min: Number(curvature.min),
			},
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
function isMomentCurvatureFull(values: {
	moment: IElementDynamicState['moment']
	curvature: IElementDynamicState['curvature']
}) {
	const { moment, curvature } = values
	return (
		Number(moment.max) !== 0 &&
		Number(moment.min) !== 0 &&
		Number(curvature.max) !== 0 &&
		Number(curvature.min) !== 0
	)
}
