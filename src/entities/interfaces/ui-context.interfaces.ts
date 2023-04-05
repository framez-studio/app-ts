import {
	IAppState,
	IElement,
	IElementDynamicStateHook,
	INode,
	ISelectedElementPropsStateHook,
	ISelectedSteelStateHook,
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

export interface IElementContext {
	elementProps: ISelectedElementPropsStateHook
	elementSteel: ISelectedSteelStateHook
	elementDynamics: IElementDynamicStateHook
}
