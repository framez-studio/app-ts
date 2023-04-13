import { IElement, ISteelRowState, ISteelStateHook } from '@interfaces'
import { useElementSteelInitialState } from './useElementSteelInitialState'
import { isRowFull } from '@utils/ui'

export function useElementSteelState(): ISteelStateHook {
	const [state, updateState] = useElementSteelInitialState()

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
		let { reinforcement } = element.section

		if (reinforcement.length === 0) {
			updateState((draft) => {
				draft.yield = ''
				draft.young = ''
				draft.rows = []
			})
			return
		}
		const { section } = reinforcement[0]

		updateState((draft) => {
			draft.yield = String(section.fy)
			draft.young = String(section.young)
			draft.rows = reinforcement.map((row) => {
				return {
					quantity: String(row.quantity),
					diameter: String(row.section.diameter),
					distance: String(row.distance),
				}
			})
		})
	}
	function clearEmptySteelRows() {
		updateState((draft) => {
			draft.rows = draft.rows.filter((row) => isRowFull(row))
		})
	}
	return {
		state,
		updateYield,
		updateSteelYoung,
		createEmptySteelRow,
		addSteelRow,
		updateSteelRow,
		removeSteelRow,
		assignElementState,
		clearEmptySteelRows,
	}
}
