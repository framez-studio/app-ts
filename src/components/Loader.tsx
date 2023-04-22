import '@styles/Loader.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		spinnerSize: number
		text: string
	}
}

const Loader: React.FC<Props> = ({ props }) => {
	const { spinnerSize, text } = props
	return (
		<section className="loader">
			<div
				className="loader--spinner"
				style={{
					width: `${spinnerSize}px`,
					height: `${spinnerSize}px`,
				}}></div>
			<span className="loader--text">{text}</span>
		</section>
	)
}

export default Loader
