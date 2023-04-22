import {
	IAppState,
	IElement,
	IFrameSystem,
	INode,
	ISelectedElementDynamicStateHook,
	ISelectedElementPropsStateHook,
	ISelectedSteelStateHook,
	IStructureGeneratorStateHook,
	IStructurePushoverState,
	IStructurePushoverUIState,
} from '@interfaces'
import { IFormSections } from '@types-ui'

export interface IAppContext {
	state: IAppState
	setSelection(payload: {
		type: 'node' | 'element' | null
		object: INode | IElement | null
	}): void
	setStructure(payload: IFrameSystem): void
	setIsSolving(payload: boolean): void
	toggleSlider(): void
	requestCanvasRedraw(): void
	resetCanvasRedraw(): void
	setSliderActiveSection(payload: IFormSections): void
}
export interface IElementContext {
	elementProps: ISelectedElementPropsStateHook
	elementSteel: ISelectedSteelStateHook
	elementDynamics: ISelectedElementDynamicStateHook
}
export interface IActiveSectionContext {
	activeSection: IFormSections
	setActiveSection(payload: IFormSections): void
}
export interface IGeneratorContext extends IStructureGeneratorStateHook {}
export interface IStructurePushoverContext {
	state: IStructurePushoverState
	ui: IStructurePushoverUIState
	updateDirection(payload: IStructurePushoverState['direction']): void
	updateNode(payload: Partial<IStructurePushoverState['node']>): void
	updateConstants(
		payload: Partial<IStructurePushoverState['constants']>,
	): void
	updateSelectedStep(
		payload: IStructurePushoverUIState['selected']['step'],
	): void
	updateSelectedNode(
		payload: IStructurePushoverUIState['selected']['nodeIndex'],
	): void
	updateActiveSection(
		payload: IStructurePushoverUIState['activeSection'],
	): void
	runPushover(): void
}
