import { useRef } from 'react'
import { usePointersCache } from './usePointersCache'

export function useDoubleClick(
	doubleClickHandler: (e?: React.PointerEvent) => any,
) {
	const MIN_DIFF = 200 // minimum difference in miliseconds for a double click to be valid
	const lastClick = useRef(0)
	const hadMultiplePointers = useRef(false)
	const pointersCache = usePointersCache({ maxPointers: 2 })

	function pointerUpHandler(e: React.PointerEvent) {
		releaseClick(e)
		if (isDoubleClick(e)) doubleClickHandler(e)
		lastClick.current = e.timeStamp
	}
	function registerClick(e: React.PointerEvent) {
		pointersCache.registerPointer(e)
		if (pointersCache.pointersCount() == 1)
			hadMultiplePointers.current = false
	}
	function releaseClick(e: React.PointerEvent) {
		pointersCache.deletePointer(e)
		if (pointersCache.pointersCount() > 0)
			hadMultiplePointers.current = true
	}
	function isDoubleClick(e: React.PointerEvent) {
		let diff = e.timeStamp - lastClick.current
		return !hadMultiplePointers.current && lastClick && diff < MIN_DIFF
	}
	return { pointerDownHandler: registerClick, pointerUpHandler }
}
