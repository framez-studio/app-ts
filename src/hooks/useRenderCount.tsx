import { useEffect, useRef } from 'react'

export function useRenderCount() {
	const count = useRef(0)
	useEffect(() => {
		count.current++
		console.log(`rendered ${count.current} times`)
	}, [])
}
