import { useAppContext } from '@context/AppContext'
import { StructureSolverWorkerResponse } from '@interfaces'
import { generateStructureFromFile } from '@utils/framez-file-parser'
import { useMemo } from 'react'

export function useWorkers() {
	const { setStructure, requestCanvasRedraw } = useAppContext()

	const StaticWorker: Worker = useMemo(
		() =>
			new Worker(new URL('../workers/StaticSolver.ts', import.meta.url), {
				type: 'module',
			}),
		[],
	)
	StaticWorker.onmessage = staticWorkerHandler

	const PushoverWorker: Worker = useMemo(
		() =>
			new Worker(
				new URL('../workers/PushoverSolver.ts', import.meta.url),
				{ type: 'module' },
			),
		[],
	)

	function staticWorkerHandler(
		e: MessageEvent<StructureSolverWorkerResponse>,
	) {
		const { structure } = e.data
		const instance = generateStructureFromFile(structure)
		setStructure(instance)
		requestCanvasRedraw()
	}

	return { StaticWorker, PushoverWorker }
}
