import React from 'react'
import '@styles/FormSectionLabel.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		label: string
		isActive: boolean
		onClick?(): void
	}
}

const FormSectionLabel: React.FC<Props> = ({ props, className }) => {
	const classes = `form-section-label hoverable ${
		props.isActive ? 'active-section' : ''
	} ${className ?? ''}`
	return (
		<span className={classes} onPointerUp={props?.onClick}>
			{props.label}
		</span>
	)
}

export default FormSectionLabel
