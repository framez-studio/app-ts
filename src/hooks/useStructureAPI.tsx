import { useAppContext } from '@context/AppContext'
import { useWorkers } from './useWorkers'
import {
	FramezFile,
	IFrameSystem,
	PushoverProcess,
	SolverProcess,
	StructurePushoverWorkerResponse,
	StructureSolverWorkerResponse,
} from '@interfaces'
import { generateStructureFromFile } from '@utils/framez-file-parser'
import { FrameSystem } from '@classes/complex-elements/frame-system'
import { getStructureInstance } from '@config/structure'

export function useStructureAPI() {
	const { setIsSolving } = useAppContext()
	const structure = getStructureInstance()
	const { StaticWorker, PushoverWorker } = useWorkers()

	function requestStructureSolver(
		callback: (structure: FrameSystem) => void,
		otherStructure?: IFrameSystem,
	) {
		StaticWorker.postMessage({
			process: SolverProcess.solve,
			structure: otherStructure ?? structure,
		})
		setIsSolving(true)

		StaticWorker.onmessage = (
			e: MessageEvent<StructureSolverWorkerResponse>,
		) => {
			const { structure } = e.data
			const instance = generateStructureFromFile(structure)
			callback(instance)
			setIsSolving(false)
		}
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
			if (!pushover)
				return console.error('Theres no result for pushover run')
			callback({ curve: pushover.curve, steps: pushover.steps })
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
			if (!step)
				return console.error(
					`Theres no step for pushover step: ${config.step}`,
				)
			callback({ step })
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
