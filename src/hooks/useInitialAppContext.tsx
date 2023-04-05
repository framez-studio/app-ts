import { IAppContext, IAppState, IElement, INode } from '@interfaces'
import { initialStructure } from '@config/structure'
import { useImmer } from 'use-immer'

const initialState: IAppState = {
	structure: initialStructure,
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
	return {
		state,
		setSelection,
		toggleSlider,
		requestCanvasRedraw,
		resetCanvasRedraw,
	}
}