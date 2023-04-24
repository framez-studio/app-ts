import { IStructureGeneratorStateHook, IStructureSpace } from '@interfaces'
import { useStructureGeneratorInitialState } from './useStructureGeneratorInitialState'
import { useElementContextEmptyState } from './useElementContextEmptyState'
import { generateFramezSystemFromContext } from '@utils/structure-generator'
import { useAppContext } from '@context/AppContext'
import { useStructureAPI } from './useStructureAPI'

export function useStructureGeneratorState(): IStructureGeneratorStateHook {
	const [state, updateState] = useStructureGeneratorInitialState()
	const { setStructure } = useAppContext()
	const { requestStructureSolver } = useStructureAPI()
	const columnsContext = useElementContextEmptyState()
	const beamsContext = useElementContextEmptyState()

	function createSpanRow() {
		updateState((draft) => {
			draft.spans.push({ count: '', separation: '' })
		})
	}
	function updateSpanRow(
		index: number,
		payload: Partial<IStructureSpace>,
	): void {
		updateState((draft) => {
			draft.spans[index] = { ...draft.spans[index], ...payload }
		})
	}
	function deleteSpanRow(index: number): void {
		updateState((draft) => {
			draft.spans.splice(index, 1)
		})
	}
	function createLevelRow() {
		updateState((draft) => {
			draft.levels.push({ count: '', separation: '' })
		})
	}
	function updateLevelRow(
		index: number,
		payload: Partial<IStructureSpace>,
	): void {
		updateState((draft) => {
			draft.levels[index] = { ...draft.levels[index], ...payload }
		})
	}
	function deleteLevelRow(index: number): void {
		updateState((draft) => {
			draft.levels.splice(index, 1)
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
			const { structure } = generateFramezSystemFromContext({
				state,
				columnsContext,
				beamsContext,
			})
			setArePropsValid(true)
			setIsGenerating(true)
			requestStructureSolver((struc) => {
				setStructure(struc)
				setIsGenerating(false)
			}, structure)
			cleanEmptyRows()
		} catch (e) {
			setArePropsValid(false)
			console.log(e)
		}
	}
	function cleanEmptyRows() {
		updateState((draft) => {
			draft.spans = draft.spans.filter(
				(span) =>
					Number(span.count) !== 0 && Number(span.separation) !== 0,
			)
			draft.levels = draft.levels.filter(
				(level) =>
					Number(level.count) !== 0 && Number(level.separation) !== 0,
			)
		})
	}
	function setIsGenerating(payload: boolean) {
		updateState((draft) => {
			draft.isGenerating = payload
		})
	}
	return {
		state,
		columnsContext,
		beamsContext,
		createSpanRow,
		updateSpanRow,
		deleteSpanRow,
		createLevelRow,
		updateLevelRow,
		deleteLevelRow,
		setSectionsConfigToggle,
		setLoadsConfigToggle,
		generateStructure,
	}
}
