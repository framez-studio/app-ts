import { useEffect, useRef } from 'react'
import { useCanvasGestures } from './useCanvasGestures'
import { getContextFromRef, clearContext } from '@utils/canvas'
import { IPlotterData, IPlotterSettings } from '@interfaces'
import { plotGrid } from '@utils/plotter'

export function usePlotter(settings: IPlotterSettings) {
	const ref = useRef<HTMLCanvasElement | null>(null)
	const data = useRef<IPlotterData>({ x: [], y: [] })
	const gestures = useCanvasGestures()

	function updateScreen() {
		const ctx = getContextFromRef(ref)
		clearContext(ctx)
		gestures.applyGestures(ctx)
		plotGrid(ctx, settings, data.current)
	}
	function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
		gestures.pointerDownHandler(e)
		updateScreen()
	}
	function handlePointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
		gestures.pointerUpHandler(e)
		updateScreen()
	}
	function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
		gestures.pointerMoveHandler(e)
		updateScreen()
	}
	function handleWheel(e: React.WheelEvent<HTMLCanvasElement>) {
		gestures.wheelHandler(e)
		updateScreen()
	}
	function setData(newData: IPlotterData) {
		data.current = { ...newData }
	}
	useEffect(updateScreen, [settings, data.current])
	return {
		ref,
		handlePointerDown,
		handlePointerUp,
		handlePointerMove,
		handleWheel,
		setData,
	}
}
