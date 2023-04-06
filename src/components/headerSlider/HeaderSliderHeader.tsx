import React from 'react'
import FormSectionLabel from '@components/FormSectionLabel'
import { useActiveSectionContext } from '@context/ActiveSectionContext'

interface Props extends React.HTMLProps<HTMLDivElement> {}
const HeaderSliderHeader: React.FC<Props> = () => {
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
					isActive: activeSection == 'cross-sections',
					onClick: () => setActiveSection('cross-sections'),
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

export default HeaderSliderHeader
