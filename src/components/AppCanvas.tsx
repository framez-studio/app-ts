import React, { useEffect } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'
import { useAppContext } from '@context/AppContext'
import { useAppCanvas } from '@hooks/useAppCanvas'

const AppCanvas = () => {
	const { height, width } = useWindowSize()
	const { state } = useAppContext()
	const canvas = useAppCanvas(state)

	useEffect(() => canvas.updateScreen(), [width, height])
	return (
		<canvas
			width={width}
			height={height}
			ref={canvas.canvasRef}
			onPointerDown={canvas.handlePointerDown}
			onPointerUp={canvas.handlePointerUp}
			onPointerMove={canvas.handlePointerMove}
			onWheel={canvas.handleWheel}
		/>
	)
}

export default AppCanvas
