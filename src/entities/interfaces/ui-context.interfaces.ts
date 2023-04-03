import {
	IAppState,
	IElement,
	IElementPropsState,
	IElementSteelState,
	INode,
	ISteelRowState,
} from '@interfaces'

export interface IAppContext {
	state: IAppState
	setSelection(payload: {
		type: 'node' | 'element' | null
		object: INode | IElement | null
	}): void
	toggleSlider(): void
	requestCanvasRedraw(): void
	resetCanvasRedraw(): void
}

export interface IElementFormContext {
	propsState: IElementPropsState
	steelState: IElementSteelState
	setYoung(payload: string): void
	setEpsilon(payload: string): void
	setBase(payload: string): void
	setHeight(payload: string): void
	setLoad(payload: string): void
	setSteelYoung(payload: string): void
	setSteelYield(payload: string): void
	addEmptySteelRow(): void
	updateSteelRow(payload: {
		index: number
		data: Partial<ISteelRowState>
	}): void
	removeSteelRow(payload: { index: number }): void
}
