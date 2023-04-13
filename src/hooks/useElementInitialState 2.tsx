import { IElementPropsState } from '@interfaces'
import { useImmer } from 'use-immer'

export function useElementInitialState() {
	const initialState: IElementPropsState = {
		fc: '21000',
		young: '17872000',
		epsilon: '0.004',
		sectionDims: {
			base: '0.2',
			height: '0.2',
		},
		load: '0',
		response: {
			initial: {
				fx: '',
				fy: '',
				mz: '',
			},
			final: {
				fx: '',
				fy: '',
				mz: '',
			},
		},
	}
	const [state, updateState] = useImmer<IElementPropsState>(initialState)
	return [state, updateState] as const
}
