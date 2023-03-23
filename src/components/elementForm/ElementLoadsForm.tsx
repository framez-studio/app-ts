import '@styles/Form.sass'
import FormInput from '@components/FormInput'
import { useElementSelection } from '@hooks/useElementSelection'

const ElementLoadsForm = () => {
	const { load, setLoad } = useElementSelection()
	return (
		<section className="form-container">
			<section className="form-main element-loads">
				<FormInput
					props={{
						label: 'Distributed Load:',
						suffix: 'kN/m',
						value: String(load),
						onChange: ($e) => setLoad(Number($e.target.value)),
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default ElementLoadsForm
