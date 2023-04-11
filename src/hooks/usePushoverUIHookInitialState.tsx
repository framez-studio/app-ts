import { IStructurePushoverUIState } from '@interfaces'
import { useImmer } from 'use-immer'

export function usePushoverUIHookInitialState() {
	const initialState: IStructurePushoverUIState = {
		activeSection: 'config',
		selected: {
			nodeIndex: 0,
			step: 0,
		},
		arePropsValid: true,
		analysisError: false,
	}
	const [state, updateState] = useImmer(initialState)

	return [state, updateState] as const
}
