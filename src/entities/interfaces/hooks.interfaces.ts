import {
	IElement,
	IElementDynamicState,
	IElementPropsState,
	IElementSteelState,
	ISteelRowState,
} from '@interfaces'

export interface ISteelStateHook {
	state: IElementSteelState
	updateSteelYoung(payload: string): void
	updateYield(payload: string): void
	addSteelRow(payload: ISteelRowState): void
	createEmptySteelRow(): void
	updateSteelRow(index: number, payload: Partial<ISteelRowState>): void
	removeSteelRow(index: number): void
	assignElementState(element: IElement): void
}
export interface IElementPropsStateHook {
	state: IElementPropsState
	updateYoung(payload: string): void
	updateEpsilon(payload: string): void
	updateSectionDims(payload: Partial<IElementPropsState['sectionDims']>): void
	updateLoad(payload: string): void
	updateResponse(payload: Partial<IElementPropsState['response']>): void
	assignElementState(element: IElement): void
}
export interface IElementDynamicStateHook {
	state: IElementDynamicState
	updateWeight(payload: string): void
	toggleAutomatic(): void
	updateCurvature(payload: Partial<IElementDynamicState['curvature']>): void
	updateMoment(payload: Partial<IElementDynamicState['moment']>): void
}
export interface ISelectedSteelStateHook
	extends Omit<ISteelStateHook, 'assignElementState'> {}
export interface ISelectedElementPropsStateHook
	extends Omit<
		IElementPropsStateHook,
		'assignElementState' | 'updateResponse'
	> {}
