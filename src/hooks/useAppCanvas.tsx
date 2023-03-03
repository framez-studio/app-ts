import { clearContext, getContextFromRef, layerToTypeMap } from '@utils'
import { useCanvasGestures } from './useCanvasGestures'
import { useRef } from 'react'
import { useAppContext } from '@context/AppContext'

export function useAppCanvas() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const { graphicStructure, setSelection } = useAppContext()
	const gestures = useCanvasGestures()

	function updateScreen() {
		const ctx = getContextFromRef(canvasRef)
		clearContext(ctx)
		gestures.applyGestures(ctx)
		graphicStructure.current.setContext(ctx)
		graphicStructure.current.printOnContext()
	}
	function handlePointerDown(e: React.PointerEvent) {
		gestures.pointerDownHandler(e)
		updateScreen()
	}
	function handlePointerUp(e: React.PointerEvent) {
		gestures.pointerUpHandler(e)
		graphicStructure.current.pointerUpHandler(e)
		updateScreen()
		syncContextWithStructure()
	}
	function handlePointerMove(e: React.PointerEvent) {
		gestures.pointerMoveHandler(e)
		graphicStructure.current.pointerMoveHandler(e)
		updateScreen()
	}
	function handleWheel(e: React.WheelEvent) {
		gestures.wheelHandler(e)
		updateScreen()
	}
	function syncContextWithStructure(): void {
		const { layer, index } = graphicStructure.current.selected
		const existsSelection = layer != null && index != null
		const type = existsSelection ? layerToTypeMap[layer] : null
		const object = existsSelection
			? graphicStructure.current.getGraphicElement(layer, index).object
			: null
		setSelection({ type, object })
	}
	return {
		canvasRef,
		updateScreen,
		handlePointerUp,
		handlePointerDown,
		handlePointerMove,
		handleWheel,
	}
}
