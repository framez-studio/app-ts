import '@styles/Form.sass'
import HeaderSliderHeader from './HeaderSliderHeader'
import HeaderSliderBodySwitcher from './HeaderSliderBodySwitcher'

const HeaderSliderBody = () => {
	return (
		<section className="slider-body">
			<HeaderSliderHeader />
			<HeaderSliderBodySwitcher />
		</section>
	)
}

export default HeaderSliderBody
