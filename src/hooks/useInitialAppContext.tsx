import { IAppContext, IAppState, IElement, INode } from '@interfaces'
import { getStructureInstance, setStructureInstance } from '@config/structure'
import { useImmer } from 'use-immer'
import { IFormSections } from '@types-ui'

const initialState: IAppState = {
	structure: getStructureInstance(),
	isSolving: false,
	canvas: {
		selection: {
			type: null,
			object: null,
		},
		needsRedraw: true,
	},
	interactions: {
		isDragging: false,
		isZooming: false,
	},
	slider: {
		isOpen: false,
		activeSection: 'properties',
	},
}

export function useInitialAppContext(): IAppContext {
	const [state, updateState] = useImmer(initialState)

	function setSelection(payload: {
		type: 'node' | 'element' | null
		object: INode | IElement | null
	}) {
		const { type, object } = payload
		const { type: prevType, object: prevObject } = state.canvas.selection
		if (type == prevType && object == prevObject) return
		updateState((draft) => {
			draft.canvas.selection = { type, object }
		})
	}
	function toggleSlider() {
		updateState((draft) => {
			draft.slider.isOpen = !draft.slider.isOpen
		})
	}
	function requestCanvasRedraw() {
		updateState((draft) => {
			draft.canvas.needsRedraw = true
		})
	}
	function resetCanvasRedraw() {
		updateState((draft) => {
			draft.canvas.needsRedraw = false
		})
	}
	function setSliderActiveSection(payload: IFormSections): void {
		updateState((draft) => {
			draft.slider.activeSection = payload
		})
	}
	function setStructure(payload: IAppState['structure']): void {
		updateState((draft) => {
			draft.structure = payload
		})
		setStructureInstance(payload)
		requestCanvasRedraw()
	}
	function setIsSolving(payload: boolean) {
		updateState((draft) => {
			draft.isSolving = payload
		})
	}
	return {
		state,
		setSelection,
		toggleSlider,
		requestCanvasRedraw,
		resetCanvasRedraw,
		setSliderActiveSection,
		setStructure,
		setIsSolving,
	}
}
