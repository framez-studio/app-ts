import React, { useState } from 'react'
import '@styles/FormDualInput.sass'
import FormSectionLabel from '@components/FormSectionLabel'
import FormInput from '@components/FormInput'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		title: string
		first: { label: string; suffix: string }
		second: { label: string; suffix: string }
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
			<FormInput
				props={{ label: props.first.label, suffix: props.first.suffix }}
			/>
			<FormInput
				props={{
					label: props.second.label,
					suffix: props.second.suffix,
				}}
			/>
		</section>
	)
}

export default FormDualInput
