import { useState } from 'react'
import InputSliderHeader from '../inputSlider/InputSliderHeader'
import ElementFormSwitcher from './ElementFormSwitcher'
import { IFormSections } from '@types-ui'
import { ElementContextProvider } from '@context/ElementContext'

const ElementForm = () => {
	const [activeSection, setActiveSection] =
		useState<IFormSections>('properties')
	return (
		<ElementContextProvider>
			<InputSliderHeader props={{ activeSection, setActiveSection }} />
			<ElementFormSwitcher props={{ activeSection }} />
		</ElementContextProvider>
	)
}

export default ElementForm
