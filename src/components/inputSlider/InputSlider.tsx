import '@styles/Slider.sass'
import '@styles/InputSlider.sass'
import InputSliderSlot from '@components/inputSlider/InputSliderSlot'
import InputSliderBody from '@components/inputSlider/InputSliderBody'
import { useAppContext } from '@context/AppContext'
import { ActiveSectionContextProvider } from '@context/ActiveSectionContext'

const InputSlider = () => {
	const { state, toggleSlider } = useAppContext()
	const { isOpen } = state.slider
	return (
		<ActiveSectionContextProvider props={{ default: 'properties' }}>
			<section
				className={`slider input-slider ${
					isOpen ? 'opened' : 'closed'
				}`}>
				<InputSliderSlot
					props={{ isOpen, onArrowClick: toggleSlider }}
				/>
				<InputSliderBody />
			</section>
		</ActiveSectionContextProvider>
	)
}

export default InputSlider
