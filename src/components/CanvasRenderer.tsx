import React, { useRef } from 'react'
import '@styles/CanvasRenderer.sass'

interface Props extends React.HTMLProps<HTMLCanvasElement> {
	props: {
		width: number
		height: number
	}
}

const CanvasRenderer: React.FC<Props> = ({ props }) => {
	const canvasRef = useRef<null | HTMLCanvasElement>(null)
	return (
		<canvas
			className="framez-canvas"
			width={`${props.width}px`}
			height={`${props.height}px`}
			ref={canvasRef}
		/>
	)
}

export default CanvasRenderer
