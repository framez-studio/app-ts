import React, { useState } from 'react'
import '@styles/FormInput.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		label?: string
		suffix?: string
		value?: string
		onChange?($e: React.ChangeEvent): void
	}
}

const FormInput: React.FC<Props> = ({ props }) => {
	const [isActive, setIsActive] = useState(false)
	const onFocus = (e: React.FocusEvent) => {
		e.preventDefault()
		setIsActive(true)
	}
	const onBlur = () => setIsActive(false)
	const classState = `form-input ${props?.suffix ? '' : 'suffix-less'} ${
		isActive ? 'active' : ''
	}`
	return (
		<label className="form-input-container">
			{props?.label && (
				<span className="input-label secondary-text">
					{props?.label}
				</span>
			)}
			<div className={classState}>
				<input
					type="tel"
					value={props?.value}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={props?.onChange}
				/>
				{props?.suffix && (
					<span className="input-suffix secondary-text">
						{props?.suffix}
					</span>
				)}
			</div>
		</label>
	)
}

export default FormInput
