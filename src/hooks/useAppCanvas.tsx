import { IAppState } from '@interfaces'
import { clearContext, printStructure } from '@utils'
import { useCanvas } from '@hooks/useCanvas'
import { useCanvasGestures } from './useCanvasGestures'

export function useAppCanvas(state: IAppState) {
	const { canvasRef, setTracer } = useCanvas()
	const gestures = useCanvasGestures()

	const draw = setTracer(
		(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
			clearContext(ctx)
			gestures.applyGestures(ctx)
			printStructure(ctx, state.structure, 'static')
		},
	)
	function handlePointerDown(e: React.PointerEvent) {
		gestures.pointerDownHandler(e)
	}
	function handlePointerUp(e: React.PointerEvent) {
		gestures.pointerUpHandler(e)
	}
	function handlePointerMove(e: React.PointerEvent) {
		gestures.pointerMoveHandler(e)
	}
	function handleWheel(e: React.WheelEvent) {
		gestures.wheelHandler(e)
	}
	return {
		canvasRef,
		updateScreen: draw,
		handlePointerUp,
		handlePointerDown,
		handlePointerMove,
		handleWheel,
	}
}
