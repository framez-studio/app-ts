import { IStructurePushoverHook, IStructurePushoverState } from '@interfaces'
import { usePushoverHookInitialState } from './usePushoverHookInitialState'
import { useStructureAPI } from './useStructureAPI'

export function useStructurePushoverHook(): IStructurePushoverHook {
	const { requestStructurePushover, getNode } = useStructureAPI()
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
		requestStructurePushover({
			direction: state.direction,
			node: { x: Number(state.node.x), y: Number(state.node.y) },
			constants: state.constants,
		})
		const data = [
			{ x: 0, y: 0 },
			{ x: 1, y: 1 },
		]
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
