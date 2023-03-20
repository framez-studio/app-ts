import { IFormSections } from '@types-ui'
import { useState } from 'react'
import FormSectionHeaderSwitcher from '../FormSectionHeaderSwitcher'
import NodeFormSwitcher from './NodeFormSwitcher'

const NodeForm = () => {
	const [activeSection, setActiveSection] =
		useState<IFormSections>('properties')
	return (
		<>
			<FormSectionHeaderSwitcher
				props={{ activeSection, setActiveSection }}
			/>
			<NodeFormSwitcher props={{ activeSection }} />
		</>
	)
}

export default NodeForm
