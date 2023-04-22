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
	const { process, config } = e.data

	switch (process) {
		case PushoverProcess.solve:
			if (!config) return
			const { structure } = config
			const instance = generateStructureFromFile(structure)
			console.log('calculating pushover')
			try {
				curve = [
					...getCapacityCurve({ ...config, structure: instance }),
				]
				sequence = { ...getPlasticizingSequence() }
			} catch (e) {
				console.log('Error during pushover:\n', e)
			}
			resetPushover()
			console.log('pushover finished')
	}
}
