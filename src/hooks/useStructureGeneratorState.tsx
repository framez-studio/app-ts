import {
	IStructureGeneratorState,
	IStructureGeneratorStateHook,
} from '@interfaces'
import { useStructureGeneratorInitialState } from './useStructureGeneratorInitialState'
import { useElementContextEmptyState } from './useElementContextEmptyState'

export function useStructureGeneratorState(): IStructureGeneratorStateHook {
	const [state, updateState] = useStructureGeneratorInitialState()
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
	function generateStructure() {
		console.log('generateSructure')
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
