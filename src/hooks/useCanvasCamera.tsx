import { IAppCanvasCamera } from '@types-ui'
import { transformContext } from '@utils'
import { useState } from 'react'

export function useCanvasCamera() {
	const [camera, setCamera] = useState<IAppCanvasCamera>({
		dx: 0,
		dy: 0,
		scale: 1,
	})

	function placeCamera(ctx: CanvasRenderingContext2D) {
		let { dx, dy, scale } = camera
		const transformation = {
			dx: -dx,
			dy: -dy,
			scale: scale,
		}
		transformContext(ctx, transformation)
	}
	function resetCamera() {
		setCamera((camera) => ({ ...camera, dx: 0, dy: 0, scale: 1 }))
	}
	function moveCamera(diff: { dx?: number; dy?: number }) {
		let { dx, dy } = camera
		dx += diff.dx ?? 0
		dy += diff.dy ?? 0
		console.log(`moving, ${dx}, ${dy}`)
		setCamera((camera) => ({ ...camera, dx, dy }))
	}
	function zoomCamera(scale: number, focus: { x: number; y: number }) {
		const { x, y } = focus
		let { dx, dy } = camera
		const translate = {
			dx: (x + dx) * (scale - 1),
			dy: (y + dy) * (scale - 1),
		}
		setCamera((camera) => ({ ...camera, scale: camera.scale * scale }))
		moveCamera(translate)
	}
	return { placeCamera, resetCamera, moveCamera, zoomCamera }
}
