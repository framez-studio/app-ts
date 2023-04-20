import React from 'react'
import { useActiveSectionContext } from '@context/ActiveSectionContext'
import SectionsForm from '@components/generatorForm/SectionsForm'
import StructureForm from '@components/generatorForm/StructureForm'
import LoadsForm from './LoadsForm'

interface Props extends React.HTMLProps<HTMLDivElement> {}

const GeneratorBodySwitcher: React.FC<Props> = () => {
	const { activeSection } = useActiveSectionContext()

	switch (activeSection) {
		case 'generator':
			return <StructureForm />
		case 'loads':
			return <LoadsForm />
		default:
			return <SectionsForm />
	}
}

export default GeneratorBodySwitcher
