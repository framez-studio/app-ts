import { IStructurePushoverState } from '@interfaces'
import { useImmer } from 'use-immer'

export function usePushoverHookInitialState() {
	const initialState: IStructurePushoverState = {
		node: {
			x: 0,
			y: 0,
		},
		isNodeValid: true,
		direction: 'right',
		constants: {
			av: 0.25,
			fv: 0.25,
		},
		results: {
			data: [],
		},
	}
	const [state, updateState] = useImmer(initialState)

	return [state, updateState] as const
}
