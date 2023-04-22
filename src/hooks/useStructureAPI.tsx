import { useAppContext } from '@context/AppContext'
import { useWorkers } from './useWorkers'
import {
	FramezFile,
	PushoverProcess,
	SolverProcess,
	StructurePushoverWorkerResponse,
} from '@interfaces'

export function useStructureAPI() {
	const { state } = useAppContext()
	const { structure } = state
	const { StaticWorker, PushoverWorker } = useWorkers()

	function requestStructureSolver() {
		StaticWorker.postMessage({ process: SolverProcess.solve, structure })
	}

	function getNode(node: { x: number; y: number }) {
		return structure.node(node)
	}

	function requestPushoverSolver(
		config: {
			direction: 'left' | 'right'
			node: { x: number; y: number }
			constants: { av: number; fv: number }
		},
		callback: (results: { curve: number[][]; steps: number }) => void,
	) {
		PushoverWorker.postMessage({
			process: PushoverProcess.solve,
			config: { structure, ...config },
		})
		PushoverWorker.onmessage = (
			e: MessageEvent<StructurePushoverWorkerResponse>,
		) => {
			const { pushover } = e.data
			if (pushover) {
				callback({ curve: pushover.curve, steps: pushover.steps })
				return
			}
			console.error('Theres no result for pushover run')
		}
	}
	function requestPushoverStep(
		config: { step: number },
		callback: (results: { step: FramezFile }) => void,
	) {
		PushoverWorker.postMessage({
			process: PushoverProcess.getStep,
			step: config.step,
		})
		PushoverWorker.onmessage = (
			e: MessageEvent<StructurePushoverWorkerResponse>,
		) => {
			const { step } = e.data
			if (step) {
				callback({ step })
				return
			}
			console.error(`Theres no step for pushover step: ${config.step}`)
		}
	}

	return {
		structure,
		requestStructureSolver,
		requestPushoverSolver,
		requestPushoverStep,
		getNode,
	}
}
