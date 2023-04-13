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
} from 'recharts'

interface Props extends React.HTMLProps<HTMLCanvasElement> {
	props: {
		title?: string
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
				<Label value={props?.title} position="insideTop" offset={0} />
				<XAxis dataKey="x">
					<Label
						value={props?.xLabel}
						position="insideBottom"
						offset={-10}
					/>
				</XAxis>
				<YAxis dataKey="y">
					<Label
						value={props?.yLabel}
						position="insideLeft"
						angle={-90}
						offset={0}
					/>
				</YAxis>
				<Line
					type="monotone"
					dataKey="x"
					stroke="#8d4bf6ff"
					dot={{ fill: '#653AAA' }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default Plotter
