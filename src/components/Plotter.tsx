import React from 'react'
import '@styles/Plotter.sass'
import { usePlotter } from '@hooks/usePlotter'

interface Props extends React.HTMLProps<HTMLCanvasElement> {
	props: {
		width: number
		height: number
	}
}

const Plotter: React.FC<Props> = ({ props }) => {
	const plotter = usePlotter({ xLabel: 'x', yLabel: 'y' })
	plotter.setData({ x: [0, 2, 4], y: [0, 2, 4] })
	return (
		<canvas
			className="plotter"
			width={props.width}
			height={props.height}
			ref={plotter.ref}
			onPointerDown={plotter.handlePointerDown}
			onPointerUp={plotter.handlePointerUp}
			onPointerMove={plotter.handlePointerMove}
			onWheel={plotter.handleWheel}></canvas>
	)
}

export default Plotter
