export interface ISteelRowState {
	quantity: string
	diameter: string
	distance: string
}
export interface IElementSteelState {
	young: string
	yield: string
	rows: ISteelRowState[]
}
export interface IElementPropsState {
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
}
