import { IElementSteelState } from '@interfaces'
import { useImmer } from 'use-immer'

export function useElementSteelInitialState() {
	const initialState: IElementSteelState = {
		young: '200000',
		yield: '420000',
		rows: [],
	}
	const [state, updateState] = useImmer<IElementSteelState>(initialState)

	return [state, updateState] as const
}
