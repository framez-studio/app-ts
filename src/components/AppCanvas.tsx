import React, { useEffect, useRef } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'
import { useAppContext } from '@context/AppContext'
import { printStructure } from '@utils'

const AppCanvas = () => {
	const { height, width } = useWindowSize()
	const { state } = useAppContext()
	const canvasRef = useRef<null | HTMLCanvasElement>(null)

	useEffect(() => onLoad(), [width, height])
	return <canvas width={width} height={height} ref={canvasRef} />

	function onLoad() {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		printStructure(state.structure, ctx, 'static')
	}
}

export default AppCanvas
