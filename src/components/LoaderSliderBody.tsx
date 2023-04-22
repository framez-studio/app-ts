import '@styles/LoaderSliderBody.sass'
import Loader from './Loader'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		text: string
	}
}

const LoaderSliderBody: React.FC<Props> = ({ props }) => {
	return (
		<section className="form-container">
			<section className="form-main form-loader col-1">
				<Loader props={{ spinnerSize: 60, text: props.text }} />
			</section>
		</section>
	)
}

export default LoaderSliderBody
