import { useRef } from 'react'

export function useCanvasRef() {
	const ref = useRef<HTMLCanvasElement | null>(null)

	function getContext() {
		if (!ref.current)
			throw new Error('Canvas not mounted. Check if ref is mounted.')
		const ctx = ref.current.getContext('2d')
		if (!ctx)
			throw new Error(
				'Canvas context not found. Check if canvas has a context.',
			)
		return ctx
	}
	function getCanvas() {
		if (!ref.current)
			throw new Error('Canvas not mounted. Check if ref is mounted.')
		return ref.current
	}
	return { ref, getContext, getCanvas }
}
