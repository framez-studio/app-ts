import React, { useEffect, useState } from 'react'
import '@styles/FormInput.sass'

export interface FormInputProps extends React.HTMLProps<HTMLDivElement> {
	props?: {
		label?: string
		suffix?: string
		value?: string
		readonly?: boolean
		onBlur?($e: React.ChangeEvent<HTMLInputElement>): void
	}
}
/**
 * TODO: Add input verification.
 */
const FormInput: React.FC<FormInputProps> = ({ props }) => {
	const [isActive, setIsActive] = useState(false)
	const [value, setValue] = useState(props?.value ?? '')
	const classState = `form-input ${props?.suffix ? '' : 'suffix-less'} ${
		isActive ? 'active' : ''
	}`
	useEffect(() => setValue(props?.value ?? ''), [props?.value])
	return (
		<label className="form-input-container">
			{props?.label && (
				<span className="input-label secondary-text">
					{props?.label}
				</span>
			)}
			<div className={classState}>
				<input
					type="number"
					inputMode="text"
					value={value}
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
		</label>
	)
	function onWheel(e: WheelEvent) {
		e.preventDefault()
	}
	function onFocus(e: React.FocusEvent<HTMLInputElement>) {
		e.preventDefault()
		setIsActive(true)
		e.target.addEventListener('wheel', onWheel)
	}
	function onBlur(e: React.FocusEvent<HTMLInputElement>) {
		setIsActive(false)
		props?.onBlur?.(e)
		e.target.removeEventListener('wheel', onWheel)
	}
	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)
	}
}

function decimalChecker(value: string) {
	const regexp = new RegExp(`^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$`)
}
export default FormInput
