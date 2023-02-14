import { useEffect, useRef } from 'react'

export const requestAnimationFrame = window.requestAnimationFrame

export const cancelAnimationFrame = window.cancelAnimationFrame

export function useCanvas() {
	const canvasRef = useRef<null | HTMLCanvasElement>(null)
	const animationFrameId = useRef<number | null>(null)
	let canvas: null | HTMLCanvasElement
	let context: null | CanvasRenderingContext2D
	let tracer: (
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
	) => void

	function updateContext() {
		canvas = canvasRef.current
		if (canvas) {
			context = canvas.getContext('2d')
			animationFrameId.current = requestAnimationFrame(renderFrame)
		}
	}

	function setTracer(
		tracerFn: (
			context: CanvasRenderingContext2D,
			canvas: HTMLCanvasElement,
		) => void,
	) {
		tracer = tracerFn
		return updateContext
	}

	function renderFrame() {
		if (!context || !canvas) throw new Error('No context or canvas')
		console.log('rendering frame with id: ', animationFrameId.current)
		animationFrameId.current = requestAnimationFrame(renderFrame)
		tracer(context, canvas)
	}

	useEffect(() => {
		updateContext()
		return () => {
			if (!animationFrameId.current) return
			console.log('canceling animation frame')
			cancelAnimationFrame(animationFrameId.current)
		}
	}, [])

	return { canvasRef, setTracer }
}
