import { IElementDynamicState } from '@interfaces'
import { useImmer } from 'use-immer'

export function useElementDynamicInitialState() {
	const initialState: IElementDynamicState = {
		weight: '24',
		automatic: true,
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

	return [state, updateState] as const
}
