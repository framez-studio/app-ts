import { SolverProcess, StructureSolverWorkerData } from '@interfaces'
import { displaceStructure, setStructureReactions } from '@utils/elements'
import { generateStructureFromFile } from '@utils/framez-file-parser'

self.onmessage = (e: MessageEvent<StructureSolverWorkerData>) => {
	const { process, structure } = e.data

	if (process === SolverProcess.solve) {
		const instance = generateStructureFromFile(structure)
		displaceStructure(instance)
		setStructureReactions(instance)
		console.log('done solving')
		self.postMessage({ structure: instance })
	}
}
