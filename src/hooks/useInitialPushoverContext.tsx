import {
	IStructurePushoverContext,
	IStructurePushoverState,
	IStructurePushoverUIState,
} from '@interfaces'
import { useStructurePushoverHook } from './usePushoverHook'
import { useStructurePushoverUIHook } from './usePushoverUIHook'
import { useAppContext } from '@context/AppContext'

export function useInitialPushoverContext(): IStructurePushoverContext {
	const { setStructure, requestCanvasRedraw } = useAppContext()
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
		const currentSteps = pushover.state.results.sequence.length

		if (payload < 0) return
		if (payload > currentSteps) return
		if (!pushover.state.initialStructure)
			return console.error('initial structure does not exist')

		ui.updateSelectedStep(payload)
		if (payload == 0) {
			setStructure(pushover.state.initialStructure)
			requestCanvasRedraw()
		} else {
			const { structure } = pushover.state.results.sequence.filter(
				(plasticStep) => plasticStep.step === payload - 1,
			)[0]
			setStructure(structure)
			requestCanvasRedraw()
		}
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
		if (payload === 'config') {
			setStructure(pushover.state.initialStructure!)
			requestCanvasRedraw()
			pushover.updateInitialStructure(null)
		}
	}

	function runPushover(): void {
		if (!arePropsValid()) return ui.updatePropsValidity(false)
		if (pushover.state.initialStructure) {
			console.log('initial structure already exists')
			return ui.updateErrorState(true)
		}
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
