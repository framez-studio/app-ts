import { IElementDynamicState, IElementDynamicStateHook } from '@interfaces'
import { useImmer } from 'use-immer'

export function useElementDynamicState(): IElementDynamicStateHook {
	const initialState: IElementDynamicState = {
		weight: '',
		automatic: false,
		curvature: {
			min: '',
			max: '',
		},
		moment: {
			min: '',
			max: '',
		},
	}
	const [state, updateState] = useImmer(initialState)

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
