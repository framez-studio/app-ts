import StructureForm from '@components/structureForm/StructureForm'
import { useActiveSectionContext } from '@context/ActiveSectionContext'
import React from 'react'

interface Props extends React.HTMLProps<HTMLDivElement> {}

const HeaderSliderBodySwitcher: React.FC<Props> = () => {
	const { activeSection } = useActiveSectionContext()

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
