import StructureForm from '@components/structureForm/StructureForm'
import { IHeaderSections } from '@types-ui'
import React from 'react'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		activeSection: IHeaderSections
	}
}

const HeaderSliderBodySwitcher: React.FC<Props> = ({ props }) => {
	const { activeSection } = props

	switch (activeSection) {
		case 'structure':
			return <StructureForm />
		case 'cross-sections':
			return <div>Cross-sections</div>
		case 'loads':
			return <div>Loads</div>
		default:
			return <div>Something weird happened with Selection State</div>
	}
}

export default HeaderSliderBodySwitcher
