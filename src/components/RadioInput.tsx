import '@styles/RadioInput.sass'
import React from 'react'
import FormInputLabel from './FormInputLabel'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	props: {
		label: string
		checked: boolean
		onChange: (value: boolean) => void
	}
}

const RadioInput: React.FC<Props> = ({ props }) => {
	const { label, checked } = props

	return (
		<section className="form-radio-container">
			<input
				type="radio"
				className="element-type-item"
				checked={checked}
				onChange={onChange}
			/>
			<FormInputLabel props={{ label }} />
		</section>
	)
	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		props.onChange(e.target.checked)
	}
}

export default RadioInput
