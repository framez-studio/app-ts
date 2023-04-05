import '@styles/Slider.sass'
import '@styles/InputSlider.sass'
import InputSliderSlot from '@components/inputSlider/InputSliderSlot'
import InputSliderBody from '@components/inputSlider/InputSliderBody'
import { useAppContext } from '@context/AppContext'

const InputSlider = () => {
	const { state, toggleSlider } = useAppContext()
	const { isOpen } = state.slider
	return (
		<section
			className={`slider input-slider ${isOpen ? 'opened' : 'closed'}`}>
			<InputSliderSlot props={{ isOpen, onArrowClick: toggleSlider }} />
			<InputSliderBody />
		</section>
	)
}

export default InputSlider