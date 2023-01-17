import React from 'react'
import '@styles/FormSwitcher.sass'
import FormSectionLabel from './FormSectionLabel'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		hasProperties: boolean
		hasLoads: boolean
		hasResponse: boolean
	}
}

const FormSwitcherHeader = () => {
	const sections = [
		{ text: 'Properties', shouldRender: true },
		{ text: 'Loads', shouldRender: true },
		{ text: 'Structural Response', shouldRender: true },
	]
	const sectionElements = sections.map((section, index) => (
		<FormSectionLabel
			key={`section-${index}`}
			props={{ label: section.text, isActive: false }}
		/>
	))
	return <section className="form-switcher-header">{sectionElements}</section>
}

export default FormSwitcherHeader
