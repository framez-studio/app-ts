import { IElementSteelState, ISteelRowState } from '@interfaces'

export type ISteelStateHook = () => {
	state: IElementSteelState
	updateYield: (newYield: string) => void
	updateSteelEpsilon: (newEpsilon: string) => void
	addSteelRow: (newRow: ISteelRowState) => void
	createEmptySteelRow: () => void
	updateSteelRow: (index: number, newData: Partial<ISteelRowState>) => void
	removeSteelRow: (index: number) => void
}
