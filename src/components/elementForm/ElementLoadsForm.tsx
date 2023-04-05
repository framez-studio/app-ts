import '@styles/Form.sass'
import FormInput from '@components/FormInput'
import { useElementSelectionState } from '@hooks/useElementSelectionState'

const ElementLoadsForm = () => {
	const { state, setLoad } = useElementSelectionState()
	return (
		<section className="form-container">
			<section className="form-main element-loads">
				<FormInput
					props={{
						label: 'Distributed Load:',
						suffix: 'kN/m',
						value: state.load,
						onChange: ($e) => setLoad($e.target.value),
					}}
				/>
			</section>
			<section className="form-footer col-2"></section>
		</section>
	)
}

export default ElementLoadsForm
