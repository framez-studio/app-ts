import React from 'react'
import InfoTooltip from './InfoTooltip'
interface Props extends React.HTMLProps<HTMLSpanElement> {
	props: {
		label: string
		tooltip?: string
	}
}

const FormInputLabel: React.FC<Props> = ({ props, className }) => {
	return (
		<section className={`input-label ${className ?? ''}`}>
			<span className="secondary-text">{props.label}</span>
			{props.tooltip && <InfoTooltip props={{ text: props.tooltip }} />}
		</section>
	)
}

export default FormInputLabel
