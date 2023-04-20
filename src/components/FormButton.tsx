import '@styles/FormButton.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		text: string
		onClick?(): void
	}
}

const FormButton: React.FC<Props> = ({ props, className }) => {
	return (
		<button
			onPointerUp={props.onClick}
			className={`form-button hoverable ${className ?? ''}`}>
			{props.text}
		</button>
	)
}

export default FormButton
