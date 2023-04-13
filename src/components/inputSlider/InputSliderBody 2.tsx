import React from 'react'
import '@styles/InputSlider.sass'
import InputSliderBodySwitcher from './InputSliderBodySwitcher'

const InputSliderBody: React.FC = () => {
	return (
		<section className="slider-body">
			<InputSliderBodySwitcher />
		</section>
	)
}

export default InputSliderBody
