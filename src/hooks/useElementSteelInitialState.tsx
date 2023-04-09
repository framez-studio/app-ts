import { IElementSteelState } from '@interfaces'
import { useImmer } from 'use-immer'

export function useElementSteelInitialState() {
	const initialState: IElementSteelState = {
		young: '24000000',
		yield: '50000',
		rows: [],
	}
	const [state, updateState] = useImmer<IElementSteelState>(initialState)

	return [state, updateState] as const
}
