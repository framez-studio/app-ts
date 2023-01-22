import React from 'react'
import '@styles/FormButton.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		text: string
		onClick?(): void
	}
}

const FormButton: React.FC<Props> = ({ props }) => {
	return (
		<button onPointerUp={props.onClick} className="form-button hoverable">
			{props.text}
		</button>
	)
}

export default FormButton
