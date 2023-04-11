import React from 'react'
import '@styles/FormSwitcher.sass'
import FormSectionLabel from '@components/FormSectionLabel'
import { useActiveSectionContext } from '@context/ActiveSectionContext'

interface Props extends React.HTMLProps<HTMLDivElement> {}

const InputSliderHeader: React.FC<Props> = () => {
	const { setActiveSection, activeSection } = useActiveSectionContext()
	return (
		<section className="form-header form-header--switcher">
			<FormSectionLabel
				props={{
					label: 'Properties',
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
			<FormSectionLabel
				props={{
					label: 'Response',
					isActive: activeSection == 'response',
					onClick: () => setActiveSection('response'),
				}}
			/>
		</section>
	)
}

export default InputSliderHeader
