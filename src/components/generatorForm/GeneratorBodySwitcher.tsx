import React from 'react'
import { useActiveSectionContext } from '@context/ActiveSectionContext'
import { useGeneratorContext } from '@context/GeneratorContext'
import SectionsForm from '@components/generatorForm/SectionsForm'
import StructureForm from '@components/generatorForm/StructureForm'
import LoadsForm from './LoadsForm'
import LoaderSliderBody from '@components/LoaderSliderBody'

interface Props extends React.HTMLProps<HTMLDivElement> {}

const GeneratorBodySwitcher: React.FC<Props> = () => {
	const { activeSection } = useActiveSectionContext()
	const { state } = useGeneratorContext()
	const { isGenerating } = state

	if (isGenerating)
		return <LoaderSliderBody props={{ text: 'Mixing concrete...' }} />
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
