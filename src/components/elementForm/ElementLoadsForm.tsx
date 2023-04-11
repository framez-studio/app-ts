import '@styles/Form.sass'
import FormInput from '@components/FormInput'
import { useElementContext } from '@context/ElementContext'

const ElementLoadsForm = () => {
	const { elementProps } = useElementContext()
	const { state, updateLoad } = elementProps
	return (
		<section className="form-container">
			<section className="form-main element-loads">
				<FormInput
					props={{
						label: 'Distributed Load:',
						suffix: 'kN/m',
						value: state.load,
						onChange: ($e) => updateLoad($e.target.value),
					}}
				/>
			</section>
			<section className="form-footer col-2"></section>
		</section>
	)
}

export default ElementLoadsForm
