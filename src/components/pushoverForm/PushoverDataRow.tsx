import FormInput from '@components/FormInput'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		data: { x: number; y: number }
	}
}

const PushoverDataRow: React.FC<Props> = ({ props }) => {
	const { data } = props
	return (
		<>
			<FormInput
				props={{ value: String(data.x), suffix: 'mm', readonly: true }}
			/>
			<FormInput
				props={{ value: String(data.y), suffix: 'kN', readonly: true }}
			/>
		</>
	)
}

export default PushoverDataRow
