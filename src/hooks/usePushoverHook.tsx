import {
	FramezFile,
	IStructurePushoverHook,
	IStructurePushoverState,
} from '@interfaces'
import { usePushoverHookInitialState } from './usePushoverHookInitialState'
import { useStructureAPI } from './useStructureAPI'
import { capacityCurveToPlotter } from '@utils/ui'
import { useAppContext } from '@context/AppContext'
import { generateStructureFromFile } from '@utils/framez-file-parser'

export function useStructurePushoverHook(): IStructurePushoverHook {
	const { requestPushoverSolver, requestPushoverStep, getNode, structure } =
		useStructureAPI()
	const { setStructure, requestCanvasRedraw } = useAppContext()
	const [state, updateState] = usePushoverHookInitialState()

	function updateDirection(
		payload: IStructurePushoverState['direction'],
	): void {
		updateState((draft) => {
			draft.direction = payload
		})
	}

	function updateNode(
		payload: Partial<IStructurePushoverState['node']>,
	): void {
		const finalNode = { ...state.node, ...payload }
		updateState((draft) => {
			draft.node = { ...draft.node, ...payload }
		})
		try {
			getNode(finalNode)
			updateIsNodeValid(true)
		} catch (e) {
			updateIsNodeValid(false)
		}
	}

	function updateConstants(
		payload: Partial<IStructurePushoverState['constants']>,
	): void {
		updateState((draft) => {
			draft.constants = { ...draft.constants, ...payload }
		})
	}

	function updateResults(
		payload: Partial<IStructurePushoverState['results']>,
	): void {
		updateState((draft) => {
			draft.results = { ...draft.results, ...payload }
		})
	}

	function updateInitialStructure(
		payload: IStructurePushoverState['initialStructure'],
	): void {
		updateState((draft) => {
			draft.initialStructure = payload
		})
	}

	function updateIsNodeValid(payload: boolean): void {
		updateState((draft) => {
			draft.isNodeValid = payload
		})
	}
	function updateIsCalculating(payload: boolean): void {
		updateState((draft) => {
			draft.isCalculating = payload
		})
	}

	function runPushover(): void {
		updateInitialStructure(structure)
		updateIsCalculating(true)
		requestPushoverSolver(
			{
				direction: state.direction,
				node: { x: Number(state.node.x), y: Number(state.node.y) },
				constants: state.constants,
			},
			onPushoverRun,
		)
	}
	function getStep(step: number): void {
		if (!state.initialStructure)
			throw new Error('initial structure does not exist')
		if (step > 0) {
			requestPushoverStep({ step }, onGetStep)
		} else if (step === 0) {
			setStructure(state.initialStructure)
			requestCanvasRedraw()
		}
	}
	function onPushoverRun(results: { curve: number[][]; steps: number }) {
		const { curve, steps } = results
		const data = capacityCurveToPlotter(curve)
		updateIsCalculating(false)
		updateResults({ data, steps })
	}
	function onGetStep(results: { step: FramezFile }) {
		const pStep = generateStructureFromFile(results.step)
		setStructure(pStep)
		requestCanvasRedraw()
	}

	return {
		state,
		updateDirection,
		updateNode,
		updateConstants,
		updateInitialStructure,
		runPushover,
		getStep,
	}
}
