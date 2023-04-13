import '@styles/Form.sass'
import GeneratorHeader from '../generatorForm/GeneratorHeader'
import GeneratorBody from '@components/generatorForm/GeneratorBody'

const HeaderSliderBody = () => {
	return (
		<section className="slider-body">
			<GeneratorHeader />
			<GeneratorBody />
		</section>
	)
}

export default HeaderSliderBody
