import {
	IElement,
	IElementPropsState,
	IElementPropsStateHook,
} from '@interfaces'
import { forcesArrayToObject } from '@utils/elements'
import { useImmer } from 'use-immer'

export function useElementState(): IElementPropsStateHook {
	const initialState: IElementPropsState = {
		young: '',
		epsilon: '',
		sectionDims: {
			base: '',
			height: '',
		},
		load: '',
		response: {
			initial: {
				fx: '',
				fy: '',
				mz: '',
			},
			final: {
				fx: '',
				fy: '',
				mz: '',
			},
		},
	}
	const [state, updateState] = useImmer<IElementPropsState>(initialState)

	function updateYoung(young: string) {
		updateState((draft) => {
			draft.young = young
		})
	}
	function updateEpsilon(epsilon: string) {
		updateState((draft) => {
			draft.epsilon = epsilon
		})
	}
	function updateSectionDims(sectionDims: {
		base?: string
		height?: string
	}) {
		const { base, height } = sectionDims
		updateState((draft) => {
			draft.sectionDims.base = base ?? draft.sectionDims.base
			draft.sectionDims.height = height ?? draft.sectionDims.height
		})
	}
	function updateLoad(load: string) {
		updateState((draft) => {
			draft.load = load
		})
	}
	function updateResponse(
		newResponse: Partial<IElementPropsState['response']>,
	) {
		updateState((draft) => {
			draft.response = {
				...draft.response,
				...newResponse,
			}
		})
	}
	function assignElementState(element: IElement) {
		const forces = forcesArrayToObject(element.forces)
		updateYoung(String(element.young))
		updateEpsilon(String(element.section.material.epsilon_max))
		updateSectionDims({
			base: String(element.section.b),
			height: String(element.section.h),
		})
		updateLoad(String(element.loads[0].load))
		updateResponse({
			initial: {
				fx: String(forces.initial.fx),
				fy: String(forces.initial.fy),
				mz: String(forces.initial.mz),
			},
			final: {
				fx: String(forces.final.fx),
				fy: String(forces.final.fy),
				mz: String(forces.final.mz),
			},
		})
	}
	return {
		state,
		assignElementState,
		updateYoung,
		updateEpsilon,
		updateSectionDims,
		updateLoad,
		updateResponse,
	}
}
