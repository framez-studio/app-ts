import { coordinates2D, stepPSequence } from '@types'
import { IPushoverFormSections } from '@types-ui'
import { IFrameSystem } from './frame-system.interface'

export interface ISteelRowState {
	quantity: string
	diameter: string
	distance: string
}
export type ISteelNumRowsState = {
	[key in keyof ISteelRowState]: number
}
export interface IElementSteelState {
	young: string
	yield: string
	rows: ISteelRowState[]
}
export interface IElementPropsState {
	fc: string
	young: string
	epsilon: string
	sectionDims: {
		base: string
		height: string
	}
	load: string
	response: {
		initial: {
			fx: string
			fy: string
			mz: string
		}
		final: {
			fx: string
			fy: string
			mz: string
		}
	}
}
export interface IElementDynamicState {
	weight: string
	automatic: boolean
	curvature: {
		min: string
		max: string
	}
	moment: {
		min: string
		max: string
	}
	errorState: {
		active: boolean
		message: string
	}
}
export interface IStructureSpace {
	count: string
	separation: string
}
export interface IStructureGeneratorState {
	isGenerating: boolean
	spans: IStructureSpace[]
	levels: IStructureSpace[]
	sectionsConfigToggle: 'column' | 'beam'
	loadsConfigToggle: 'column' | 'beam'
	arePropsValid: boolean
}
export interface IStructurePushoverState {
	initialStructure: IFrameSystem | null
	isCalculating: boolean
	node: {
		x: number
		y: number
	}
	isNodeValid: boolean
	direction: 'left' | 'right'
	constants: {
		av: number
		fv: number
	}
	results: {
		data: coordinates2D[]
		bilineal: coordinates2D[]
		steps: number
	}
}
export interface IStructurePushoverUIState {
	activeSection: IPushoverFormSections
	selected: {
		nodeIndex: number
		step: number
	}
	arePropsValid: boolean
	analysisError: boolean
}
