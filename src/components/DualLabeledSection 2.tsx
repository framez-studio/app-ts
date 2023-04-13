import '@styles/DualLabeledSection.sass'
import FormInputLabel from './FormInputLabel'

interface Props extends React.HTMLAttributes<HTMLElement> {
	props: {
		label: string
		tooltip?: string
	}
}

const DualLabeledSection: React.FC<Props> = ({ props, children }) => {
	const { label, tooltip } = props
	return (
		<section className="dual-labeled-section col-2">
			<FormInputLabel
				props={{ label, tooltip }}
				className="span-2 jc-center"
			/>
			{children}
		</section>
	)
}

export default DualLabeledSection
