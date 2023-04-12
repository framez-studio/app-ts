import React, { useEffect, useState } from 'react'
import '@styles/FormInput.sass'
import FormInputLabel from './FormInputLabel'

export interface FormInputProps extends React.HTMLProps<HTMLDivElement> {
	props?: {
		label?: string
		labelCentered?: boolean
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
	const [value, setValue] = useState(props?.value ?? '')
	const classState = `form-input ${props?.suffix ? '' : 'suffix-less'} ${
		isActive ? 'active' : ''
	}`

	useEffect(() => {
		setValue(props?.value ?? '')
	}, [props?.value])
	return (
		<section className={`form-input-container ${className ?? ''}`}>
			{props?.label && (
				<FormInputLabel
					props={{ label: props.label, tooltip: props.tooltip }}
					className={props?.labelCentered ? 'jc-center' : ''}
				/>
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
		</section>
	)
	function onFocus(e: React.FocusEvent<HTMLInputElement>) {
		e.preventDefault()
		setIsActive(true)
		e.target.addEventListener('wheel', onWheel)
	}
	function onBlur(e: React.FocusEvent<HTMLInputElement>) {
		setIsActive(false)
		props?.onChange?.(e)
		e.target.removeEventListener('wheel', onWheel)
	}
	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		// if (!isRealNumber(e.target.value)) return
		setValue(e.target.value)
	}
}

function isRealNumber(value: string) {
	const regexp = new RegExp('^-?[0-9]+(?:\\.[0-9]+)?$')
	return regexp.test(value)
}
function onWheel(e: WheelEvent) {
	e.preventDefault()
}

export default FormInput
