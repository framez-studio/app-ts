import {
	IElement,
	IElementContext,
	IElementDynamicState,
	IElementPropsState,
	IElementSteelState,
	ISteelRowState,
	IStructureGeneratorState,
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
	clearEmptySteelRows(): void
}
export interface ISelectedSteelStateHook
	extends Omit<
		ISteelStateHook,
		'assignElementState' | 'clearEmptySteelRows'
	> {}
export interface IElementPropsStateHook {
	state: IElementPropsState
	updateFc(payload: string): void
	updateYoung(payload: string): void
	updateEpsilon(payload: string): void
	updateSectionDims(payload: Partial<IElementPropsState['sectionDims']>): void
	updateLoad(payload: string): void
	updateResponse(payload: Partial<IElementPropsState['response']>): void
	assignElementState(element: IElement): void
}
export interface ISelectedElementPropsStateHook
	extends Omit<
		IElementPropsStateHook,
		'assignElementState' | 'updateResponse'
	> {}
export interface IElementDynamicStateHook {
	state: IElementDynamicState
	updateWeight(payload: string): void
	toggleAutomatic(): void
	updateCurvature(payload: Partial<IElementDynamicState['curvature']>): void
	updateMoment(payload: Partial<IElementDynamicState['moment']>): void
	assignElementState(element: IElement): void
}
export interface ISelectedElementDynamicStateHook
	extends Omit<IElementDynamicStateHook, 'assignElementState'> {}
export interface IStructureGeneratorStateHook {
	state: IStructureGeneratorState
	columnsContext: IElementContext
	beamsContext: IElementContext
	updateSpans(payload: Partial<IStructureGeneratorState['spans']>): void
	updateLevels(payload: Partial<IStructureGeneratorState['levels']>): void
	setSectionsConfigToggle(payload: 'column' | 'beam'): void
	setLoadsConfigToggle(payload: 'column' | 'beam'): void
	generateStructure(): void
}
