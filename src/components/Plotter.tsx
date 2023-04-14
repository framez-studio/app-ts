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
	Legend,
} from 'recharts'

interface Props extends React.HTMLProps<HTMLCanvasElement> {
	props: {
		xLabel?: string
		yLabel?: string
		height?: number
		series: {
			name: string
			data: { x: number; y: number }[]
			color: string
			dotColor: string
		}[]
	}
}

const Plotter: React.FC<Props> = ({ props }) => {
	const { series } = props
	const lines = series.map((serie) => (
		<Line
			key={serie.name}
			type="linear"
			data={serie.data}
			dataKey="y"
			name={serie.name}
			stroke={serie.color}
			dot={{ fill: serie.dotColor }}
		/>
	))

	return (
		<ResponsiveContainer height={props.height ?? '100%'}>
			<LineChart margin={{ top: 15, right: 30, left: 10, bottom: 20 }}>
				<CartesianGrid stroke="#676c72" strokeDasharray="3 3" />
				<XAxis dataKey="x" type="number">
					<Label
						value={props?.xLabel}
						position="insideBottom"
						offset={-10}
					/>
				</XAxis>
				<YAxis dataKey="y" type="number">
					<Label
						value={props?.yLabel}
						position="insideLeft"
						angle={-90}
						offset={0}
					/>
				</YAxis>
				{/* <Tooltip /> */}
				<Legend height={0} />
				{lines}
			</LineChart>
		</ResponsiveContainer>
	)
}

export default Plotter
