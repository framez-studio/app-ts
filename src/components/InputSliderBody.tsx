import React, { useState } from 'react'
import '@styles/InputSlider.sass'
import InputSliderBodySwitcher from './InputSliderBodySwitcher'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const InputSliderBody: React.FC<Props> = ({ props }) => {
	return (
		<section className="input-slider-body">
			<InputSliderBodySwitcher />
		</section>
	)
}

export default InputSliderBody
