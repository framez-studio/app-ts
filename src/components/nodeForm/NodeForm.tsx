import { IFormSections } from '@types-ui'
import { useState } from 'react'
import InputSliderHeader from '../inputSlider/InputSliderHeader'
import NodeFormSwitcher from './NodeFormSwitcher'

const NodeForm = () => {
	const [activeSection, setActiveSection] =
		useState<IFormSections>('properties')
	return (
		<>
			<InputSliderHeader props={{ activeSection, setActiveSection }} />
			<NodeFormSwitcher props={{ activeSection }} />
		</>
	)
}

export default NodeForm
