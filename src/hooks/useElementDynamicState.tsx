import {
	IElement,
	IElementDynamicState,
	IElementDynamicStateHook,
} from '@interfaces'
import { useElementDynamicInitialState } from './useElementDynamicInitialState'

export function useElementDynamicState(): IElementDynamicStateHook {
	const [state, updateState] = useElementDynamicInitialState()

	function updateWeight(value: string) {
		updateState((draft) => {
			draft.weight = value
		})
	}
	function updateAutomatic(value: boolean) {
		updateState((draft) => {
			draft.automatic = value
		})
	}
	function toggleAutomatic() {
		updateState((draft) => {
			draft.automatic = !draft.automatic
		})
	}
	function updateCurvature(
		payload: Partial<IElementDynamicState['curvature']>,
	) {
		updateState((draft) => {
			draft.curvature = {
				...draft.curvature,
				...payload,
			}
		})
	}
	function updateMoment(payload: Partial<IElementDynamicState['moment']>) {
		updateState((draft) => {
			draft.moment = {
				...draft.moment,
				...payload,
			}
		})
	}
	function updateErrorState(
		payload: Partial<IElementDynamicState['errorState']>,
	) {
		updateState((draft) => {
			draft.errorState = {
				...draft.errorState,
				...payload,
			}
		})
	}
	function assignElementState(element: IElement) {
		const { weight } = element.section.material
		const hinge = element.getHinge('initial') || element.getHinge('final')

		updateWeight(String(weight))
		if (hinge) {
			updateAutomatic(false)
			updateCurvature({
				max: String(hinge.maxCurv),
				min: String(hinge.minCurve),
			})
			updateMoment({
				max: String(hinge.maxMoment),
				min: String(hinge.minMoment),
			})
		} else {
			updateAutomatic(true)
		}
	}
	return {
		state,
		updateWeight,
		toggleAutomatic,
		updateCurvature,
		updateMoment,
		assignElementState,
	}
}
