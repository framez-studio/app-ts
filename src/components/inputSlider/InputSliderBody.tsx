import React, { useState } from 'react'
import '@styles/InputSlider.sass'
import { IFormSections } from '@types-ui'
import InputSliderBodySwitcher from './InputSliderBodySwitcher'
import InputSliderHeader from './InputSliderHeader'

const InputSliderBody: React.FC = () => {
	const [activeSection, setActiveSection] =
		useState<IFormSections>('properties')

	return (
		<section className="slider-body">
			<InputSliderHeader props={{ activeSection, setActiveSection }} />
			<InputSliderBodySwitcher props={{ activeSection }} />
		</section>
	)
}

export default InputSliderBody
