import React, { useState } from 'react'
import '@styles/InputSlider.sass'
import { IFormSections } from '@types-ui'
import FormSwitcherHeader from '@components/FormSwitcherHeader'
import ElementFormSwitcher from '@components/elementForm/ElementFormSwitcher'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const InputSliderBody: React.FC<Props> = ({ props }) => {
	const [activeSection, setActiveSection] =
		useState<IFormSections>('properties')
	return (
		<section className="input-slider-body">
			<FormSwitcherHeader props={{ activeSection, setActiveSection }} />
			<ElementFormSwitcher props={{ activeSection }} />
		</section>
	)
}

export default InputSliderBody
