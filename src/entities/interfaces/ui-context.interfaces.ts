import {
	IAppState,
	IElement,
	IElementDynamicStateHook,
	INode,
	ISelectedElementPropsStateHook,
	ISelectedSteelStateHook,
	IStructure,
	IStructureGeneratorStateHook,
} from '@interfaces'
import { IFormSections } from '@types-ui'

export interface IAppContext {
	state: IAppState
	setSelection(payload: {
		type: 'node' | 'element' | null
		object: INode | IElement | null
	}): void
	setStructure(payload: IStructure): void
	toggleSlider(): void
	requestCanvasRedraw(): void
	resetCanvasRedraw(): void
	setSliderActiveSection(payload: IFormSections): void
}
export interface IElementContext {
	elementProps: ISelectedElementPropsStateHook
	elementSteel: ISelectedSteelStateHook
	elementDynamics: IElementDynamicStateHook
}
export interface IActiveSectionContext {
	activeSection: IFormSections
	setActiveSection(payload: IFormSections): void
}
export interface IGeneratorContext extends IStructureGeneratorStateHook {}
