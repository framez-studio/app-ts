import React, { useState } from 'react'
import '@styles/FormDualInput.sass'
import FormSectionLabel from '@components/FormSectionLabel'
import FormInput, { FormInputProps } from '@components/FormInput'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		title: string
		first: FormInputProps
		second: FormInputProps
	}
}

const FormDualInput: React.FC<Props> = ({ props }) => {
	const [isActive, setIsActive] = useState(false)
	const onFocus = (e: React.FocusEvent) => {
		e.preventDefault()
		setIsActive(true)
	}
	const onBlur = () => setIsActive(false)
	return (
		<section className="form-dual-input" onFocus={onFocus} onBlur={onBlur}>
			<div className="form-dual-input-title">
				<FormSectionLabel
					props={{ label: props.title, isActive: isActive }}
				/>
			</div>
			<FormInput props={props.first.props} />
			<FormInput props={props.second.props} />
		</section>
	)
}

export default FormDualInput
