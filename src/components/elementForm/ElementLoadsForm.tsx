import '@styles/Form.sass'
import FormInput from '@components/FormInput'
import { useElementSelectionState } from '@hooks/useElementSelectionState'

const ElementLoadsForm = () => {
	const { load, setLoad } = useElementSelectionState()
	return (
		<section className="form-container">
			<section className="form-main element-loads">
				<FormInput
					props={{
						label: 'Distributed Load:',
						suffix: 'kN/m',
						value: load,
						onChange: ($e) => setLoad($e.target.value),
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default ElementLoadsForm
