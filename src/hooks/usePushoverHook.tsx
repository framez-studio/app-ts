import { IStructurePushoverHook, IStructurePushoverState } from '@interfaces'
import { usePushoverHookInitialState } from './usePushoverHookInitialState'
import { useStructureAPI } from './useStructureAPI'
import { capacityCurveToPlotter } from '@utils/ui'

export function useStructurePushoverHook(): IStructurePushoverHook {
	const { requestPushoverSolver, getNode } = useStructureAPI()
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

	function updateIsNodeValid(payload: boolean): void {
		updateState((draft) => {
			draft.isNodeValid = payload
		})
	}

	function runPushover(): void {
		const curve = requestPushoverSolver({
			direction: state.direction,
			node: { x: Number(state.node.x), y: Number(state.node.y) },
			constants: state.constants,
		})
		const data = capacityCurveToPlotter(curve)
		updateResults({ data })
	}

	return {
		state,
		updateDirection,
		updateNode,
		updateConstants,
		runPushover,
	}
}
