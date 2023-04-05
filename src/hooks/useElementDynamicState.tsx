import { useImmer } from 'use-immer'

export interface IElementDynamicState {
	weight: string
	automatic: boolean
	curvature: {
		min: string
		max: string
	}
	moment: {
		min: string
		max: string
	}
}

export function useElementDynamicState() {
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
	function updateCurvature(value: string, type: 'min' | 'max') {
		updateState((draft) => {
			draft.curvature[type] = value
		})
	}
	function updateMoment(value: string, type: 'min' | 'max') {
		updateState((draft) => {
			draft.moment[type] = value
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
