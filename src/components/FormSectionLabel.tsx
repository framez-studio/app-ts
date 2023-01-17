import React from 'react'
import '@styles/FormSectionLabel.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		label: string
		isActive: boolean
	}
}

const FormSectionLabel: React.FC<Props> = ({ props }) => {
	return (
		<span
			className={`form-section-label hoverable ${
				props.isActive ? 'active-section' : ''
			}`}>
			{props.label}
		</span>
	)
}

export default FormSectionLabel
