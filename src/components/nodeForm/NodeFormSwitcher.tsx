import { IFormSections } from '@types-ui'
import React from 'react'
import NodePropertiesForm from './NodePropertiesForm'
import NodeLoadsForm from './NodeLoadsForm'
import NodeResponseForm from './NodeResponseForm'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		activeSection: IFormSections
	}
}

const NodeFormSwitcher: React.FC<Props> = ({ props }) => {
	switch (props.activeSection) {
		case 'properties':
			return <NodePropertiesForm />
		case 'loads':
			return <NodeLoadsForm />
		case 'response':
			return <NodeResponseForm />
		default:
			return <span> unknown element form</span>
	}
}

export default NodeFormSwitcher
