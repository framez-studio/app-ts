import { clearContext, getContextFromRef } from '@utils'
import { useCanvasGestures } from './useCanvasGestures'
import { useEffect, useRef } from 'react'
import { useAppContext } from '@context/AppContext'
import { useGraphicStructure } from './useGraphicStructure'

export function useAppCanvas() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const context = useAppContext()
	const graphicStructure = useGraphicStructure()
	const gestures = useCanvasGestures()

	function updateScreen() {
		const ctx = getContextFromRef(canvasRef)
		clearContext(ctx)
		gestures.applyGestures(ctx)
		graphicStructure.printOnContext(ctx)
		context.resetCanvasRedraw()
	}
	function handlePointerDown(e: React.PointerEvent) {
		gestures.pointerDownHandler(e)
		updateScreen()
	}
	function handlePointerUp(e: React.PointerEvent) {
		gestures.pointerUpHandler(e)
		graphicStructure.pointerUpHandler(e)
		updateScreen()
	}
	function handlePointerMove(e: React.PointerEvent) {
		gestures.pointerMoveHandler(e)
		graphicStructure.pointerMoveHandler(e)
		updateScreen()
	}
	function handleWheel(e: React.WheelEvent) {
		gestures.wheelHandler(e)
		updateScreen()
	}
	useEffect(() => {
		const { needsRedraw } = context.state.canvas
		if (!needsRedraw) return
		updateScreen()
	}, [context.state.canvas.needsRedraw])
	return {
		canvasRef,
		updateScreen,
		handlePointerUp,
		handlePointerDown,
		handlePointerMove,
		handleWheel,
	}
}
