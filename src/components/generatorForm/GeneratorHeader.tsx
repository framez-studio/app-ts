import React from 'react'
import FormSectionLabel from '@components/FormSectionLabel'
import { useActiveSectionContext } from '@context/ActiveSectionContext'

interface Props extends React.HTMLProps<HTMLDivElement> {}
const GeneratorHeader: React.FC<Props> = () => {
	const { activeSection, setActiveSection } = useActiveSectionContext()
	return (
		<section className="form-header form-header--switcher">
			<FormSectionLabel
				props={{
					label: 'Structure',
					isActive: activeSection == 'structure',
					onClick: () => setActiveSection('structure'),
				}}
			/>
			<FormSectionLabel
				props={{
					label: 'Sections',
					isActive: activeSection == 'properties',
					onClick: () => setActiveSection('properties'),
				}}
			/>
			<FormSectionLabel
				props={{
					label: 'Loads',
					isActive: activeSection == 'loads',
					onClick: () => setActiveSection('loads'),
				}}
			/>
		</section>
	)
}

export default GeneratorHeader
