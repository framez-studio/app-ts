import { IElementDynamicState } from '@interfaces'
import { useImmer } from 'use-immer'

export function useElementDynamicInitialState() {
	const initialState: IElementDynamicState = {
		weight: '24',
		automatic: false,
		moment: {
			min: '-120',
			max: '120',
		},
		curvature: {
			min: '-0.008',
			max: '0.008',
		},
	}
	const [state, updateState] = useImmer(initialState)

	return [state, updateState] as const
}
