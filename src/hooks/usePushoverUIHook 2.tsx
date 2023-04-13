import {
	IStructurePushoverUIHook,
	IStructurePushoverUIState,
} from '@interfaces'
import { usePushoverUIHookInitialState } from './usePushoverUIHookInitialState'

export function useStructurePushoverUIHook(): IStructurePushoverUIHook {
	const [state, updateState] = usePushoverUIHookInitialState()

	function updatePropsValidity(payload: boolean): void {
		updateState((draft) => {
			draft.arePropsValid = payload
		})
	}
	function updateErrorState(payload: boolean): void {
		updateState((draft) => {
			draft.analysisError = payload
		})
	}
	function updateActiveSection(
		payload: IStructurePushoverUIState['activeSection'],
	): void {
		updateState((draft) => {
			draft.activeSection = payload
		})
	}
	function updateSelectedStep(
		payload: IStructurePushoverUIState['selected']['step'],
	): void {
		updateState((draft) => {
			draft.selected.step = payload
		})
	}
	function updateSelectedNode(
		payload: IStructurePushoverUIState['selected']['nodeIndex'],
	): void {
		updateState((draft) => {
			draft.selected.nodeIndex = payload
		})
	}

	return {
		state,
		updatePropsValidity,
		updateErrorState,
		updateActiveSection,
		updateSelectedStep,
		updateSelectedNode,
	}
}
