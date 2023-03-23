import { IAppCanvasCamera } from '@types-ui'
import { transformContext } from '@utils/canvas'
import { useRef } from 'react'

export function useCanvasCamera() {
	const camera = useRef<IAppCanvasCamera>({
		dx: 0,
		dy: 0,
		scale: 1,
	})

	function placeCamera(ctx: CanvasRenderingContext2D) {
		let { dx, dy, scale } = camera.current
		const transformation = {
			dx: -dx,
			dy: -dy,
			scale: scale,
		}
		transformContext(ctx, transformation)
	}
	function resetCamera() {
		camera.current = { ...camera.current, dx: 0, dy: 0, scale: 1 }
	}
	function moveCamera(diff: { dx?: number; dy?: number }) {
		let { dx, dy } = camera.current
		dx += diff.dx ?? 0
		dy += diff.dy ?? 0
		camera.current = { ...camera.current, dx, dy }
	}
	function zoomCamera(scaleFactor: number, focus: { x: number; y: number }) {
		const { x, y } = focus
		let { dx, dy, scale } = camera.current
		const translate = {
			dx: (x + dx) * (scaleFactor - 1),
			dy: (y + dy) * (scaleFactor - 1),
		}
		camera.current = { ...camera.current, scale: scale * scaleFactor }
		moveCamera(translate)
	}
	function getContextCoords(coords: { x: number; y: number }) {
		const { x, y } = coords
		const { dx, dy, scale } = camera.current
		return { x: (x + dx) / scale, y: (y + dy) / scale }
	}
	return {
		camera,
		placeCamera,
		resetCamera,
		moveCamera,
		zoomCamera,
		getContextCoords,
	}
}
