import { PushoverProcess, StructurePushoverWorkerData } from '@interfaces'
import { stepPSequence } from '@types'
import { generateStructureFromFile } from '@utils/framez-file-parser'
import {
	getCapacityCurve,
	getPlasticizingSequence,
	resetPushover,
} from '@utils/pushover'

let curve: number[][] = []
let sequence: stepPSequence[] = []

self.onmessage = (e: MessageEvent<StructurePushoverWorkerData>) => {
	const { process, config, step } = e.data

	switch (process) {
		case PushoverProcess.solve:
			if (!config) return
			const { structure } = config
			const instance = generateStructureFromFile(structure)
			try {
				const results = {
					curve: getCapacityCurve({ ...config, structure: instance }),
					sequence: getPlasticizingSequence(),
				}
				curve = [...results.curve]
				sequence = [...results.sequence]
				resetPushover()
			} catch (e) {
				console.log('Error during pushover:\n', e)
				resetPushover()
			}
			self.postMessage({
				pushover: {
					steps: sequence.length,
					curve: curve,
				},
			})
			break
		case PushoverProcess.getStep:
			if (!step) return
			const filter = (pStep: stepPSequence) => pStep.step === step - 1
			const index = sequence.findIndex(filter)
			if (index === -1) return
			self.postMessage({ step: sequence[index].structure })
			break
		default:
			console.log(`Unknown pushover proces: ${process}`)
			break
	}
}
