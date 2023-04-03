import React from 'react'
import FormSectionLabel from '@components/FormSectionLabel'
import { IHeaderSections } from '@types-ui'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		activeSection: IHeaderSections
		setActiveSection(section: IHeaderSections): void
	}
}
const HeaderSliderHeader: React.FC<Props> = ({ props }) => {
	return (
		<section className="form-header form-header--switcher">
			<FormSectionLabel
				props={{
					label: 'Structure',
					isActive: props.activeSection == 'structure',
					onClick: () => props.setActiveSection('structure'),
				}}
			/>
			<FormSectionLabel
				props={{
					label: 'Sections',
					isActive: props.activeSection == 'cross-sections',
					onClick: () => props.setActiveSection('cross-sections'),
				}}
			/>
			<FormSectionLabel
				props={{
					label: 'Loads',
					isActive: props.activeSection == 'loads',
					onClick: () => props.setActiveSection('loads'),
				}}
			/>
		</section>
	)
}

export default HeaderSliderHeader
