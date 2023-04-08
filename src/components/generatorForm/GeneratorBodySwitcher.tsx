import SectionsForm from '@components/generatorForm/SectionsForm'
import StructureForm from '@components/generatorForm/StructureForm'
import { useActiveSectionContext } from '@context/ActiveSectionContext'
import React from 'react'
import LoadsForm from './LoadsForm'

interface Props extends React.HTMLProps<HTMLDivElement> {}

const GeneratorBodySwitcher: React.FC<Props> = () => {
	const { activeSection } = useActiveSectionContext()

	switch (activeSection) {
		case 'structure':
			return <StructureForm />
		case 'loads':
			return <LoadsForm />
		default:
			return <SectionsForm />
	}
}

export default GeneratorBodySwitcher
