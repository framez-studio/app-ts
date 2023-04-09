import { IElementDynamicState, IElementDynamicStateHook } from '@interfaces'
import { useElementDynamicInitialState } from './useElementDynamicInitialState'

export function useElementDynamicState(): IElementDynamicStateHook {
	const [state, updateState] = useElementDynamicInitialState()

	function updateWeight(value: string) {
		updateState((draft) => {
			draft.weight = value
		})
	}
	function toggleAutomatic() {
		updateState((draft) => {
			draft.automatic = !draft.automatic
		})
	}
	function updateCurvature(
		payload: Partial<IElementDynamicState['curvature']>,
	) {
		updateState((draft) => {
			draft.curvature = {
				...draft.curvature,
				...payload,
			}
		})
	}
	function updateMoment(payload: Partial<IElementDynamicState['moment']>) {
		updateState((draft) => {
			draft.moment = {
				...draft.moment,
				...payload,
			}
		})
	}
	return {
		state,
		updateWeight,
		toggleAutomatic,
		updateCurvature,
		updateMoment,
	}
}
