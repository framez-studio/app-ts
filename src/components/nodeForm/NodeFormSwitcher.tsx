import React from 'react'
import NodePropertiesForm from './NodePropertiesForm'
import NodeLoadsForm from './NodeLoadsForm'
import NodeResponseForm from './NodeResponseForm'
import { useActiveSectionContext } from '@context/ActiveSectionContext'

interface Props extends React.HTMLProps<HTMLDivElement> {}

const NodeFormSwitcher: React.FC<Props> = () => {
	const { activeSection } = useActiveSectionContext()

	switch (activeSection) {
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
