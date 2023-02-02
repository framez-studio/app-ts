import React, { useEffect } from 'react'
import '@styles/CanvasRenderer.sass'

interface Props extends React.HTMLProps<HTMLCanvasElement> {
	props: {
		width: number
		height: number
		ref: React.MutableRefObject<HTMLCanvasElement | null>
		onClick?(): void
		onRender?(): void
	}
}

const CanvasRenderer: React.FC<Props> = ({ props }) => {
	useEffect(() => props?.onRender, [props?.onRender])
	return (
		<canvas
			className="framez-canvas"
			width={`${props.width}px`}
			height={`${props.height}px`}
			ref={props.ref}
			onPointerUp={props?.onClick}
		/>
	)
}

export default CanvasRenderer
