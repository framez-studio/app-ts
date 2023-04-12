import { IElementSteelState } from '@interfaces'
import { useImmer } from 'use-immer'

export function useElementSteelInitialState() {
	const initialState: IElementSteelState = {
		young: '200000',
		yield: '420000',
		rows: [
			{ diameter: '0.015875', distance: '0.045', quantity: '4' },
			{ diameter: '0.015875', distance: '0.355', quantity: '3' },
		],
	}
	const [state, updateState] = useImmer<IElementSteelState>(initialState)

	return [state, updateState] as const
}
