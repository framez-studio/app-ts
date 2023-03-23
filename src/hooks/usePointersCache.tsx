import { ICanvasPointer } from '@types-ui'
import { useRef } from 'react'

export function usePointersCache(opts?: { maxPointers?: number }) {
	const MAX_POINTERS_ALLOWED = opts?.maxPointers || 2
	const pointers = useRef<ICanvasPointer[]>([])

	function registerPointer(e: React.PointerEvent) {
		if (pointers.current.length == MAX_POINTERS_ALLOWED) return
		const pointer = extractPointerInfo(e)
		if (getPointerById(pointer.id)) return
		pointers.current.push(pointer)
	}
	function getPointerById(id: number): null | ICanvasPointer {
		let index = pointers.current.findIndex((pointer) => pointer.id === id)
		if (index === -1) return null
		return pointers.current[index]
	}
	function getPointers() {
		return pointers.current
	}
	function pointersCount() {
		return pointers.current.length
	}
	function deletePointer(e: React.PointerEvent) {
		const { id } = extractPointerInfo(e)
		const pointer = getPointerById(id)

		if (!pointer) return

		let index = pointers.current.indexOf(pointer)
		if (index == -1)
			throw new Error(
				`Couldn't delete pointer since it doesn't exist in pointers array.`,
			)
		pointers.current.splice(index, 1)
	}
	return {
		registerPointer,
		getPointerById,
		getPointers,
		deletePointer,
		pointersCount,
	}
}

function extractPointerInfo(e: React.PointerEvent): ICanvasPointer {
	const { pointerId: id, clientX: x, clientY: y } = e
	return { id, coords: { x, y } }
}
