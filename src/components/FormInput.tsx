import React, { useState } from 'react'
import '@styles/FormInput.sass'
import FormInputLabel from './FormInputLabel'

export interface FormInputProps extends React.HTMLProps<HTMLDivElement> {
	props?: {
		label?: string
		suffix?: string
		value?: string
		readonly?: boolean
		tooltip?: string
		onChange?($e: React.ChangeEvent<HTMLInputElement>): void
	}
}
/**
 * TODO: Add input verification.
 */
const FormInput: React.FC<FormInputProps> = ({ props, className }) => {
	const [isActive, setIsActive] = useState(false)
	const classState = `form-input ${props?.suffix ? '' : 'suffix-less'} ${
		isActive ? 'active' : ''
	}`
	return (
		<section className={`form-input-container ${className ?? ''}`}>
			{props?.label && (
				<FormInputLabel
					props={{ label: props.label, tooltip: props.tooltip }}
				/>
			)}
			<div className={classState}>
				<input
					type="number"
					inputMode="text"
					value={props?.value}
					readOnly={props?.readonly}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={onChange}
				/>
				{props?.suffix && (
					<span className="input-suffix secondary-text">
						{props.suffix}
					</span>
				)}
			</div>
		</section>
	)
	function onFocus(e: React.FocusEvent<HTMLInputElement>) {
		e.preventDefault()
		setIsActive(true)
		e.target.addEventListener('wheel', onWheel)
	}
	function onBlur(e: React.FocusEvent<HTMLInputElement>) {
		setIsActive(false)
		e.target.removeEventListener('wheel', onWheel)
	}
	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		props?.onChange?.(e)
	}
}

function decimalChecker(value: string) {
	const regexp = new RegExp(`^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$`)
}
function onWheel(e: WheelEvent) {
	e.preventDefault()
}

export default FormInput
