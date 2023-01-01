import React from 'react'
import '@styles/Slider.sass'
import '@styles/InputSlider.sass'
import InputSliderSlot from './InputSliderSlot'

const InputSlider = () => {
	return (
		<section className="slider input-slider">
			<InputSliderSlot props={{ isOpen: false }} />
		</section>
	)
}

export default InputSlider
