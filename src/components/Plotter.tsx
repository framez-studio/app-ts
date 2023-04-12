import React from 'react'
import '@styles/Plotter.sass'
import {
	CartesianGrid,
	Label,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
} from 'recharts'

interface Props extends React.HTMLProps<HTMLCanvasElement> {
	props: {
		xLabel?: string
		yLabel?: string
		height?: number
		data: { x: number; y: number }[]
	}
}

const Plotter: React.FC<Props> = ({ props }) => {
	return (
		<ResponsiveContainer height={props.height ?? '100%'}>
			<LineChart
				data={props.data}
				margin={{ top: 15, right: 30, left: 10, bottom: 20 }}>
				<CartesianGrid stroke="#676c72" strokeDasharray="3 3" />
				<XAxis dataKey="x" type="number">
					<Label
						value={props?.xLabel}
						position="insideBottom"
						offset={-10}
					/>
				</XAxis>
				<YAxis type="number">
					<Label
						value={props?.yLabel}
						position="insideLeft"
						angle={-90}
						offset={0}
					/>
				</YAxis>
				<Tooltip />
				<Line
					type="linear"
					dataKey="y"
					stroke="#8d4bf6ff"
					dot={{ fill: '#653AAA' }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default Plotter
