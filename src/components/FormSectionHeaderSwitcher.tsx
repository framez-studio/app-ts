import React from 'react'
import '@styles/FormSwitcher.sass'
import { IFormSections } from '@types-ui'
import FormSectionLabel from '@components/FormSectionLabel'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		activeSection: IFormSections
		setActiveSection(section: IFormSections): void
	}
}

const FormSectionHeaderSwitcher: React.FC<Props> = ({ props }) => {
	return (
		<section className="form-switcher-header">
			<FormSectionLabel
				props={{
					label: 'Properties',
					isActive: props.activeSection == 'properties',
					onClick: () => props.setActiveSection('properties'),
				}}
			/>
			<FormSectionLabel
				props={{
					label: 'Loads',
					isActive: props.activeSection == 'loads',
					onClick: () => props.setActiveSection('loads'),
				}}
			/>
			<FormSectionLabel
				props={{
					label: 'Response',
					isActive: props.activeSection == 'response',
					onClick: () => props.setActiveSection('response'),
				}}
			/>
		</section>
	)
}

export default FormSectionHeaderSwitcher
