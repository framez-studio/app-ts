import { IElementPropsState } from '@interfaces'
import { useImmer } from 'use-immer'

export function useElementInitialState() {
	const initialState: IElementPropsState = {
		fc: '21000',
		young: '17872000',
		epsilon: '0.003',
		sectionDims: {
			base: '0.3',
			height: '0.4',
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
