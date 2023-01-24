import React from 'react'
import { IFormSections } from '@types-ui'
import ElementLoadsForm from './ElementLoadsForm'
import ElementPropertiesForm from './ElementPropertiesForm'
import ElementResponseForm from './ElementResponseForm'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		activeSection: IFormSections
	}
}

const ElementFormSwitcher: React.FC<Props> = ({ props }) => {
	switch (props.activeSection) {
		case 'properties':
			return <ElementPropertiesForm />
		case 'loads':
			return <ElementLoadsForm />
		case 'response':
			return <ElementResponseForm />
		default:
			return <span> unknown element form</span>
	}
}

export default ElementFormSwitcher
