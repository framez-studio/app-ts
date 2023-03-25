import { useEffect } from 'react'
import { useAppContext } from '@context/AppContext'
import { clearContext } from '@utils/canvas'
import { useCanvasGestures } from './useCanvasGestures'
import { useGraphicStructure } from './useGraphicStructure'
import { useCanvasRef } from './useCanvasRef'

export function useAppCanvas() {
	const canvas = useCanvasRef()
	const context = useAppContext()
	const graphicStructure = useGraphicStructure()
	const gestures = useCanvasGestures()

	function updateScreen() {
		const ctx = canvas.getContext()
		clearContext(ctx)
		gestures.applyGestures(ctx)
		graphicStructure.printOnContext(ctx)
		context.resetCanvasRedraw()
	}
	function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
		gestures.pointerDownHandler(e)
		updateScreen()
	}
	function handlePointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
		gestures.pointerUpHandler(e)
		graphicStructure.pointerUpHandler(e)
		updateScreen()
	}
	function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
		gestures.pointerMoveHandler(e)
		graphicStructure.pointerMoveHandler(e)
		updateScreen()
	}
	function handleWheel(e: React.WheelEvent<HTMLCanvasElement>) {
		gestures.wheelHandler(e)
		updateScreen()
	}
	useEffect(() => {
		const { needsRedraw } = context.state.canvas
		if (!needsRedraw) return
		updateScreen()
	}, [context.state.canvas.needsRedraw])
	return {
		ref: canvas.ref,
		updateScreen,
		handlePointerUp,
		handlePointerDown,
		handlePointerMove,
		handleWheel,
	}
}
