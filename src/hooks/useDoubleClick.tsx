import { useState } from 'react'

const MIN_DIFF = 200 // minimum difference in miliseconds for a double click to be valid

export function useDoubleClick(
	doubleClickHandler: (e?: React.PointerEvent) => any,
) {
	const [lastClick, setLastClick] = useState(0)

	function checkDoubleClick(e: React.PointerEvent) {
		let diff = e.timeStamp - lastClick
		if (lastClick && diff < MIN_DIFF) {
			console.log('double clicked')
			doubleClickHandler(e)
		}
		setLastClick(e.timeStamp)
	}
	return { checkDoubleClick }
}
