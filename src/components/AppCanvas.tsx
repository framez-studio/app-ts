import { useEffect } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'
import { useAppCanvas } from '@hooks/useAppCanvas'

const AppCanvas = () => {
	const { height, width } = useWindowSize()
	const canvas = useAppCanvas()

	useEffect(() => canvas.updateScreen(), [width, height])
	return (
		<canvas
			width={width}
			height={height}
			ref={canvas.ref}
			onPointerDown={canvas.handlePointerDown}
			onPointerUp={canvas.handlePointerUp}
			onPointerMove={canvas.handlePointerMove}
			onWheel={canvas.handleWheel}
		/>
	)
}

export default AppCanvas
