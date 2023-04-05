import {
	IElement,
	IElementSteelState,
	ISteelRowState,
	ISteelStateHook,
} from '@interfaces'
import { useImmer } from 'use-immer'

export function useElementSteelState(): ISteelStateHook {
	const initialState: IElementSteelState = {
		young: '',
		yield: '',
		rows: [],
	}
	const [state, updateState] = useImmer<IElementSteelState>(initialState)

	function updateYield(newYield: string) {
		updateState((draft) => {
			draft.yield = newYield
		})
	}
	function updateSteelYoung(newEpsilon: string) {
		updateState((draft) => {
			draft.young = newEpsilon
		})
	}
	function addSteelRow(newRow: ISteelRowState) {
		updateState((draft) => {
			draft.rows.push(newRow)
		})
	}
	function createEmptySteelRow(): void {
		updateState((draft) => {
			draft.rows.push({ quantity: '', diameter: '', distance: '' })
		})
	}
	function updateSteelRow(index: number, newData: Partial<ISteelRowState>) {
		updateState((draft) => {
			draft.rows[index] = { ...draft.rows[index], ...newData }
		})
	}
	function removeSteelRow(index: number) {
		updateState((draft) => {
			draft.rows.splice(index, 1)
		})
	}
	function assignElementState(element: IElement) {
		const { reinforcement } = element.section

		if (reinforcement.length === 0) return
		const { section } = reinforcement[0]

		updateState((draft) => {
			draft.yield = String(section.fy)
			draft.young = String(element.young)
			draft.rows = reinforcement.map((row) => {
				return {
					quantity: String(row.quantity),
					diameter: String(row.section.diameter),
					distance: String(row.distance),
				}
			})
		})
	}
	return {
		state,
		updateYield,
		updateSteelYoung,
		addSteelRow,
		createEmptySteelRow,
		updateSteelRow,
		removeSteelRow,
		assignElementState,
	}
}
