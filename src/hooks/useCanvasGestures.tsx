import { useRef } from 'react'
import { useCanvasCamera } from '@hooks/useCanvasCamera'
import { useDoubleClick } from '@hooks/useDoubleClick'
import { usePointersCache } from './usePointersCache'
import { eucDistance } from '@utils/algebra'
import { getPointerCanvasCoords, substractCanvasPosition } from '@utils/canvas'
/**
 * Provides a hook to add pinch and wheel zoom, double tap reset and drag gestures to a canvas
 *
 * @export
 */
export function useCanvasGestures() {
	const doubleTap = useDoubleClick(doubleTapHandler)
	const camera = useCanvasCamera()
	const pointersCache = usePointersCache({ maxPointers: 2 })
	const pinchDistance = useRef(-1)

	function pointerUpHandler(e: React.PointerEvent<HTMLCanvasElement>) {
		pointersCache.deletePointer(e)
		resetGestures()
		doubleTap.pointerUpHandler(e)
	}
	function pointerDownHandler(e: React.PointerEvent<HTMLCanvasElement>) {
		pointersCache.registerPointer(e)
		setGestures()
		doubleTap.pointerDownHandler(e)
	}
	function pointerMoveHandler(e: React.PointerEvent<HTMLCanvasElement>) {
		if (isDragActive()) dragHandler(e)
		if (isZoomActive()) pinchZoomHandler(e)
	}
	function wheelHandler(e: React.WheelEvent<HTMLCanvasElement>) {
		let coords = getPointerCanvasCoords(e)
		let factor = e.deltaY < 0 ? 1.1 : 0.9
		camera.zoomCamera(factor, coords)
	}
	function applyGestures(ctx: CanvasRenderingContext2D) {
		camera.placeCamera(ctx)
	}
	// gestures handlers
	function dragHandler(e: React.PointerEvent<HTMLCanvasElement>) {
		const pointer = pointersCache.getPointerById(e.pointerId)
		if (!pointer) return

		const { coords: oldCoords } = pointer
		const newCoords = { x: e.clientX, y: e.clientY }

		const translate = {
			dx: -(newCoords.x - oldCoords.x),
			dy: -(newCoords.y - oldCoords.y),
		}
		pointer.coords = { ...newCoords }
		if (!isZoomActive()) camera.moveCamera(translate)
	}
	function pinchZoomHandler(e: React.PointerEvent<HTMLCanvasElement>) {
		let oldDistance = pinchDistance.current
		let newDistance = getPinchDistance()

		let zoomFactor = newDistance / oldDistance
		let zoomFocus = getPinchFocus(e)

		camera.zoomCamera(zoomFactor, zoomFocus)
		pinchDistance.current = newDistance
	}
	function doubleTapHandler(_e?: React.PointerEvent) {
		camera.resetCamera()
	}
	// gestures helpers
	function getPinchDistance() {
		let pointers = pointersCache.getPointers()
		if (pointersCache.pointersCount() < 2)
			throw new Error(
				`Couldn't get pinch distance. There's less than two pointers registered.`,
			)
		return eucDistance(pointers[0].coords, pointers[1].coords)
	}
	function getPinchFocus(e: React.PointerEvent<HTMLCanvasElement>) {
		let pointers = pointersCache.getPointers()
		if (pointersCache.pointersCount() < 2)
			throw new Error(
				`Couldn't get pinch focus. There's less than two pointers registered.`,
			)
		let x = (pointers[0].coords.x + pointers[1].coords.x) / 2
		let y = (pointers[0].coords.y + pointers[1].coords.y) / 2
		return substractCanvasPosition({ x, y }, e.currentTarget)
	}
	function isDragActive() {
		return pointersCache.pointersCount() >= 1
	}
	function isZoomActive() {
		return pointersCache.pointersCount() >= 2
	}
	function setGestures() {
		if (isZoomActive()) pinchDistance.current = getPinchDistance()
	}
	function resetGestures() {
		if (!isZoomActive()) pinchDistance.current = -1
	}
	return {
		pointerUpHandler,
		pointerDownHandler,
		pointerMoveHandler,
		wheelHandler,
		applyGestures,
	}
}
