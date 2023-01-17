import React, { useState } from 'react'
import '@styles/Slider.sass'
import '@styles/InputSlider.sass'
import InputSliderSlot from './InputSliderSlot'
import InputSliderBody from './InputSliderBody'

const InputSlider = () => {
	const [isOpen, setIsOpen] = useState(false)
	const sliderOpener = () => setIsOpen(!isOpen)
	return (
		<section
			className={`slider input-slider ${isOpen ? 'opened' : 'closed'}`}>
			<InputSliderSlot props={{ isOpen, onArrowClick: sliderOpener }} />
			<InputSliderBody />
		</section>
	)
}

export default InputSlider
