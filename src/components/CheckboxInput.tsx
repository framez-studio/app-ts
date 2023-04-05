import React from 'react'
import '@styles/CheckboxInput.sass'
import InfoTooltip from './InfoTooltip'

interface Props extends React.HTMLProps<HTMLLabelElement> {
	props: {
		label: string
		tooltip?: string
		checked?: boolean
		onChange?: (newCheckValue: boolean) => void
	}
}

const CheckboxInput: React.FC<Props> = ({ props, className }) => {
	return (
		<section
			className={`form-checkbox-container input-label ${
				className ?? ''
			}`}>
			<input
				type="checkbox"
				name=""
				id=""
				checked={props.checked}
				onChange={onChange}
			/>
			<span className="secondary-text">{props.label}</span>
			{props.tooltip && <InfoTooltip props={{ text: props.tooltip }} />}
		</section>
	)
	function onChange($e: React.ChangeEvent<HTMLInputElement>) {
		props.onChange?.($e.target.checked)
	}
}

export default CheckboxInput
