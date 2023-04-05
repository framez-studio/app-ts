import { ISelectedSteelStateHook, ISteelRowState } from '@interfaces'
import { useElementSelection } from '@hooks/useElementSelection'
import { useElementSteelState } from '@hooks/useElementSteelState'
import { useEffect } from 'react'

export function useElementSelectionSteelState(): ISelectedSteelStateHook {
	const element = useElementSelection()
	const steelState = useElementSteelState()

	function updateYield(newYield: string) {
		steelState.updateYield(newYield)
		element.section.reinforcement.forEach(
			(row) => (row.section.fy = Number(newYield)),
		)
	}
	function updateSteelYoung(newYoung: string) {
		steelState.updateSteelYoung(newYoung)
		element.section.reinforcement.forEach(
			(row) => (row.section.young = Number(newYoung)),
		)
	}
	function addSteelRow(newRow: ISteelRowState) {
		steelState.addSteelRow(newRow)
		element.section.addRowReinforcement(
			Number(newRow.distance),
			Number(newRow.quantity),
			{
				fy: 0,
				young: 0,
				diameter: 0,
				area: 0,
				inertiaZ: 0,
				mass: 0,
				weight: 0,
				material: undefined,
			},
		)
	}
	useEffect(() => steelState.assignElementState(element), [element])
}
