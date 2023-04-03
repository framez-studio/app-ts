import { useState } from 'react'
import InputSliderHeader from '../inputSlider/InputSliderHeader'
import ElementFormSwitcher from './ElementFormSwitcher'
import { IFormSections } from '@types-ui'

const ElementForm = () => {
	const [activeSection, setActiveSection] =
		useState<IFormSections>('properties')
	return (
		<>
			<InputSliderHeader props={{ activeSection, setActiveSection }} />
			<ElementFormSwitcher props={{ activeSection }} />
		</>
	)
}

export default ElementForm
