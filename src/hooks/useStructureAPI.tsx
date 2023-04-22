import { useAppContext } from '@context/AppContext'
import {
	getCapacityCurve,
	getPlasticizingSequence,
	resetPushover,
} from '@utils/pushover'
import { useWorkers } from './useWorkers'
import { SolverProcess, StructureSolverWorkerResponse } from '@interfaces'
import { generateStructureFromFile } from '@utils/framez-file-parser'

export function useStructureAPI() {
	const { state, setStructure, requestCanvasRedraw } = useAppContext()
	const { structure } = state
	const { StaticWorker } = useWorkers()

	function requestStructureSolver() {
		StaticWorker.postMessage({ process: SolverProcess.solve, structure })
		StaticWorker.onmessage = (
			e: MessageEvent<StructureSolverWorkerResponse>,
		) => {
			const { structure } = e.data
			const instance = generateStructureFromFile(structure)
			setStructure(instance)
			requestCanvasRedraw()
		}
	}

	function getNode(node: { x: number; y: number }) {
		return structure.node(node)
	}

	function requestPushoverSolver(config: {
		direction: 'left' | 'right'
		node: { x: number; y: number }
		constants: { av: number; fv: number }
	}) {
		const curve = getCapacityCurve({ structure, ...config })
		const sequence = getPlasticizingSequence()
		resetPushover()
		return { curve, sequence }
	}

	return {
		structure,
		requestStructureSolver,
		requestPushoverSolver,
		getNode,
	}
}
