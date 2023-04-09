import {
	IStructureGeneratorState,
	IStructureGeneratorStateHook,
} from '@interfaces'
import { useStructureGeneratorInitialState } from './useStructureGeneratorInitialState'
import { useElementContextEmptyState } from './useElementContextEmptyState'
import { generatePorticSystemFromContext } from '@utils/structure-generator'
import { useAppContext } from '@context/AppContext'

export function useStructureGeneratorState(): IStructureGeneratorStateHook {
	const [state, updateState] = useStructureGeneratorInitialState()
	const { setStructure, requestCanvasRedraw } = useAppContext()
	const columnsContext = useElementContextEmptyState()
	const beamsContext = useElementContextEmptyState()

	function updateSpans(
		payload: Partial<IStructureGeneratorState['spans']>,
	): void {
		updateState((draft) => {
			draft.spans = { ...draft.spans, ...payload }
		})
	}
	function updateLevels(
		payload: Partial<IStructureGeneratorState['levels']>,
	): void {
		updateState((draft) => {
			draft.levels = { ...draft.levels, ...payload }
		})
	}
	function setSectionsConfigToggle(payload: 'column' | 'beam'): void {
		updateState((draft) => {
			draft.sectionsConfigToggle = payload
		})
	}
	function setLoadsConfigToggle(payload: 'column' | 'beam'): void {
		updateState((draft) => {
			draft.loadsConfigToggle = payload
		})
	}
	function setArePropsValid(payload: boolean): void {
		updateState((draft) => {
			draft.arePropsValid = payload
		})
	}
	function generateStructure() {
		try {
			const { structure } = generatePorticSystemFromContext({
				state,
				columnsContext,
				beamsContext,
			})
			setArePropsValid(true)
			setStructure(structure)
			requestCanvasRedraw()
		} catch (e) {
			setArePropsValid(false)
			console.log(e)
		}
	}
	return {
		state,
		columnsContext,
		beamsContext,
		updateSpans,
		updateLevels,
		setSectionsConfigToggle,
		setLoadsConfigToggle,
		generateStructure,
	}
}
