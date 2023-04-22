import { stepPSequence } from '@types'
import { FramezFile } from './framez-file.interface'

export enum SolverProcess {
	solve = 'SOLVE',
}
export interface StructureSolverWorkerData {
	process: SolverProcess
	structure: FramezFile
}
export interface StructureSolverWorkerResponse {
	structure: FramezFile
}
export enum PushoverProcess {
	solve = 'SOLVE',
	getStep = 'GETSTEP',
}
export interface StructurePushoverWorkerData {
	process: PushoverProcess
	config?: {
		structure: FramezFile
		direction: 'left' | 'right'
		node: { x: number; y: number }
		constants: { av: number; fv: number }
	}
	step?: number
}
export interface StructurePushoverWorkerResponse {
	pushover?: {
		steps: number
		curve: number[][]
	}
	step?: FramezFile
}
