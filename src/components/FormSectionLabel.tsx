import React from 'react'
import '@styles/FormSectionLabel.sass'
import InfoTooltip from './InfoTooltip'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		label: string
		tooltip?: string
		isActive: boolean
		onClick?(): void
	}
}

const FormSectionLabel: React.FC<Props> = ({ props, className }) => {
	const classes = `form-section-label hoverable jc-center ${
		props.isActive ? 'active-section' : ''
	} ${className ?? ''}`
	return (
		<section className={classes} onPointerUp={props?.onClick}>
			<span>{props.label}</span>
			{props.tooltip && <InfoTooltip props={{ text: props.tooltip }} />}
		</section>
	)
}

export default FormSectionLabel
