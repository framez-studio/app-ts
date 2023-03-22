import Plotter from '@components/Plotter'

const DefaultForm = () => {
	return (
		<section className="form-container">
			<section className="form-main">
				<Plotter props={{ width: 400, height: 300 }} />
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default DefaultForm
