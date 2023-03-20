import { useState } from 'react'
import FormSectionHeaderSwitcher from '../FormSectionHeaderSwitcher'
import ElementFormSwitcher from './ElementFormSwitcher'
import { IFormSections } from '@types-ui'

const ElementForm = () => {
	const [activeSection, setActiveSection] =
		useState<IFormSections>('properties')
	return (
		<>
			<FormSectionHeaderSwitcher
				props={{ activeSection, setActiveSection }}
			/>
			<ElementFormSwitcher props={{ activeSection }} />
		</>
	)
}

export default ElementForm
