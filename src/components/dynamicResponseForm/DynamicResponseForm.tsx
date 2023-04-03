import Plotter from '@components/Plotter'

function DynamicResponseForm() {
	const data = [
		{ x: 1, y: 1 },
		{ x: 2, y: 3 },
		{ x: 3, y: 1 },
		{ x: 4, y: 2 },
		{ x: 5, y: 8 },
	]
	return (
		<section className="form-container">
			<section className="form-main">
				<Plotter
					props={{
						yLabel: 'Vs [kN]',
						xLabel: 'U [mm]',
						title: 'Curva de capacidad',
						data,
					}}
				/>
			</section>
			<section className="form-footer col-2"></section>
		</section>
	)
}

export default DynamicResponseForm
