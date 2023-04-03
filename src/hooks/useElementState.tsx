import { IElement, IElementState } from '@interfaces'
import { elementLoads2DObject } from '@types'
import { forcesArrayToObject } from '@utils/elements'
import { useImmer } from 'use-immer'

export function useElementState() {
	const initialState: IElementState = {
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
	const [state, updateState] = useImmer<IElementState>(initialState)

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
	function updateResponse(response: elementLoads2DObject) {
		updateState((draft) => {
			draft.response.initial.fx = String(response.initial.fx)
			draft.response.initial.fy = String(response.initial.fy)
			draft.response.initial.mz = String(response.initial.mz)
			draft.response.final.fx = String(response.final.fx)
			draft.response.final.fy = String(response.final.fy)
			draft.response.final.mz = String(response.final.mz)
		})
	}
	function assignElementState(element: IElement) {
		updateYoung(String(element.young))
		updateEpsilon(String(element.section.material.epsilon_max))
		updateSectionDims({
			base: String(element.section.b),
			height: String(element.section.h),
		})
		updateLoad(String(element.loads[0].load))
		updateResponse(forcesArrayToObject(element.forces))
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
