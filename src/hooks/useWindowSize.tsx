import { useEffect, useState } from 'react'

export const useWindowsSize = () => {
	const [size, setSize] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	})
	const updateSize = () =>
		setSize({
			height: window.innerHeight,
			width: window.innerWidth,
		})
	useEffect(() => {
		window.addEventListener('resize', updateSize)
		return window.removeEventListener('resize', updateSize)
	}, [])
	return size
}
