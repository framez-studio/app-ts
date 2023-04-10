import { ISelectedSteelStateHook, ISteelRowState } from '@interfaces'
import { useElementSelection } from '@hooks/useElementSelection'
import { useElementSteelState } from '@hooks/useElementSteelState'
import { useEffect } from 'react'
import { Steel } from '@classes/others/material'
import { BarCR } from '@classes/sections/bar-cr'
import { isRowFull } from '@utils/ui'

export function useElementSelectionSteelState(): ISelectedSteelStateHook {
	const element = useElementSelection()
	const steelState = useElementSteelState()

	function updateYield(newYield: string) {
		steelState.updateYield(newYield)
		element.section.reinforcement.forEach(
			(row) => (row.section.material.fy = Number(newYield)),
		)
	}
	function updateSteelYoung(newYoung: string) {
		steelState.updateSteelYoung(newYoung)
		element.section.reinforcement.forEach(
			(row) => (row.section.material.young = Number(newYoung)),
		)
	}
	function addSteelRow(newRow: ISteelRowState) {
		steelState.addSteelRow(newRow)
		addRowToSection(newRow)
	}
	function updateSteelRow(index: number, newData: Partial<ISteelRowState>) {
		const oldRow = steelState.state.rows[index]
		steelState.updateSteelRow(index, newData)
		syncronizeSteelRow(oldRow, newData)
	}
	function createEmptySteelRow() {
		steelState.createEmptySteelRow()
	}
	function removeSteelRow(index: number) {
		const row = steelState.state.rows[index]
		steelState.removeSteelRow(index)
		element.section.deleteRowReinforcement(Number(row.distance))
	}
	function syncronizeSteelRow(
		oldRow: ISteelRowState,
		newData: Partial<ISteelRowState>,
	) {
		const finalRow = { ...oldRow, ...newData }

		if (!isRowFull(finalRow)) return

		if (Number(finalRow.distance) !== Number(oldRow.distance))
			element.section.deleteRowReinforcement(Number(oldRow.distance))

		addRowToSection(finalRow)
		steelState.clearEmptySteelRows()
	}
	function addRowToSection(row: ISteelRowState) {
		const { diameter, distance, quantity } = row
		const { yield: fy, young } = steelState.state

		const material = new Steel('custom', Number(young), 0, Number(fy))
		const section = new BarCR(Number(diameter), material)

		element.section.addRowReinforcement(
			Number(distance),
			Number(quantity),
			section,
		)
	}
	useEffect(() => steelState.assignElementState(element), [element])
	return {
		state: steelState.state,
		updateYield,
		updateSteelYoung,
		createEmptySteelRow,
		addSteelRow,
		updateSteelRow,
		removeSteelRow,
	}
}
