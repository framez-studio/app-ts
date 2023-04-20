export interface FileNodeLoads {
	fx: number
	fy: number
	mz: number
}

export interface FileNodeDisplacements {
	dx: number
	dy: number
	rz: number
}

export interface FileNodeCoordinates {
	x: number
	y: number
}

export interface FileNodeConstraints {
	dx: boolean
	dy: boolean
	rz: boolean
}

export interface FileNodeData {
	_loads: FileNodeLoads
	_displacements: FileNodeDisplacements
	_reactions: FileNodeLoads
	_coordinates: FileNodeCoordinates
	constraints: FileNodeConstraints
}

export interface FileReleaseData {
	dx: boolean
	dy: boolean
	rz: boolean
}

export interface FileLoadData {
	load: number
	distance: {
		initial: number
		final: number
	}
}

export interface FileMaterialData {
	name: string
	fc: number
	weight: number
	young: number
	epsilon_max: number
}
export interface FileReinforcementMaterialData {
	name: string
	fy: number
	weight: number
	young: number
}

export interface FileReinforcementSectionData {
	diameter: number
	material: FileReinforcementMaterialData
}

export interface FileReinforcementData {
	distance: number
	quantity: number
	section: FileReinforcementSectionData
}

export interface FileSectionData {
	b: number
	h: number
	material: FileMaterialData
	_reinforcement: FileReinforcementData[]
}

export interface FileHingeData {
	isCollapsed: boolean
	isPositiveCollapsed: boolean
	isNegativeCollapsed: boolean
	moment: number
	maxMoment: number
	maxCurv: number
	minMoment: number
	minCurve: number
	type: string
}

export interface FileElementData {
	_nodes: {
		initial: FileNodeData
		final: FileNodeData
	}
	_releases: {
		initial: FileReleaseData
		final: FileReleaseData
	}
	_loads: FileLoadData[]
	section: FileSectionData
	initialHinge: FileHingeData
	finalHinge: FileHingeData
}

export interface FramezFile {
	_elements: FileElementData[]
}
