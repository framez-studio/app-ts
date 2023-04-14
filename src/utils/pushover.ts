import { FHE } from '@classes/seismic-analysis/fhe'
import {
	normalizeLoads2Unit,
	PushoverSolver,
} from '@classes/solvers/pushover-solver'
import { IFrameSystem } from '@interfaces'

export function getCapacityCurve(config: {
	structure: IFrameSystem
	direction: 'left' | 'right'
	node: { x: number; y: number }
	constants: { av: number; fv: number }
}) {
	const { direction, node, constants, structure } = config
	const { av, fv } = constants

	const structurePivot = structure.copy()

	normalizeLoads2Unit(structurePivot, 100)

	PushoverSolver.Run(structurePivot, node, 'service', 100)
	structurePivot.resetLoadstoZero()

	FHE.setFHEinNodes(structurePivot, direction == 'left' ? -1 : 1, 2, av, fv)
	PushoverSolver.Run(structurePivot, node, 'stability')

	return PushoverSolver.capacityCurve()
}

export function getPlasticizingSequence() {
	return PushoverSolver.plasticizingSequence()
}

export function getBilinealCurve() {
	return PushoverSolver.bilinearCapacityCurve()
}

export function resetPushover() {
	PushoverSolver.reset()
}
