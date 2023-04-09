import '@styles/ErrorMessge.sass'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
	props: {
		text: string
	}
}

const ErrorMessage: React.FC<Props> = ({ props, className }) => {
	return <span className={`error-mssg ${className ?? ''}`}>{props.text}</span>
}

export default ErrorMessage
