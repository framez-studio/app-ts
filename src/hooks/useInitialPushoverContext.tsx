import {
	IStructurePushoverContext,
	IStructurePushoverState,
	IStructurePushoverUIState,
} from '@interfaces'
import { useStructurePushoverHook } from './usePushoverHook'
import { useStructurePushoverUIHook } from './usePushoverUIHook'

export function useInitialPushoverContext(): IStructurePushoverContext {
	const pushover = useStructurePushoverHook()
	const ui = useStructurePushoverUIHook()

	function updateDirection(
		payload: IStructurePushoverState['direction'],
	): void {
		pushover.updateDirection(payload)
	}

	function updateNode(
		payload: Partial<IStructurePushoverState['node']>,
	): void {
		pushover.updateNode(payload)
	}

	function updateConstants(
		payload: Partial<IStructurePushoverState['constants']>,
	): void {
		pushover.updateConstants(payload)
	}

	function updateSelectedStep(
		payload: IStructurePushoverUIState['selected']['step'],
	): void {
		if (payload < 0) return
		ui.updateSelectedStep(payload)
	}

	function updateSelectedNode(
		payload: IStructurePushoverUIState['selected']['nodeIndex'],
	): void {
		ui.updateSelectedNode(payload)
	}

	function updateActiveSection(
		payload: IStructurePushoverUIState['activeSection'],
	): void {
		ui.updateActiveSection(payload)
	}

	function runPushover(): void {
		if (!arePropsValid()) return ui.updatePropsValidity(false)
		try {
			pushover.runPushover()
			ui.updatePropsValidity(true)
			ui.updateErrorState(false)
			ui.updateActiveSection('graph')
		} catch (e) {
			console.log(e)
			ui.updateErrorState(true)
		}
	}

	function arePropsValid(): boolean {
		const { constants, isNodeValid } = pushover.state
		const areConstantsValid = Object.values(constants).every(
			(value) => value !== 0,
		)
		return isNodeValid && areConstantsValid
	}

	return {
		state: pushover.state,
		ui: ui.state,
		updateDirection,
		updateNode,
		updateConstants,
		updateSelectedStep,
		updateSelectedNode,
		updateActiveSection,
		runPushover,
	}
}
