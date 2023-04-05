import '@styles/Form.sass'
import FormDualInput from '@components/FormDualInput'
import { useElementContext } from '@context/ElementContext'
import { responseFormatter } from '@utils/ui'

const ElementResponseForm = () => {
	const { elementProps } = useElementContext()
	const { state } = elementProps
	const { response } = state
	const inputs = generateInputs()

	return (
		<section className="form-container">
			<section className="form-main element-response">
				<FormDualInput props={inputs.axial} />
				<FormDualInput props={inputs.shear} />
				<FormDualInput props={inputs.bending} />
			</section>
		</section>
	)

	function generateInputs() {
		return {
			axial: {
				title: 'Axial Force',
				first: {
					props: {
						label: 'Initial Node',
						suffix: 'kN',
						value: responseFormatter(Number(response.initial.fx)),
						readonly: true,
					},
				},
				second: {
					props: {
						label: 'Final Node',
						suffix: 'kN',
						value: responseFormatter(Number(response.final.fx)),
						readonly: true,
					},
				},
			},
			shear: {
				title: 'Shear Force',
				first: {
					props: {
						label: 'Initial Node',
						suffix: 'kN',
						value: responseFormatter(Number(response.initial.fy)),
						readonly: true,
					},
				},
				second: {
					props: {
						label: 'Final Node',
						suffix: 'kN',
						value: responseFormatter(Number(response.final.fy)),
						readonly: true,
					},
				},
			},
			bending: {
				title: 'Bending Moment',
				first: {
					props: {
						label: 'Initial Node',
						suffix: 'kN.m',
						value: responseFormatter(Number(response.initial.mz)),
						readonly: true,
					},
				},
				second: {
					props: {
						label: 'Final Node',
						suffix: 'kN.m',
						value: responseFormatter(Number(response.final.mz)),
						readonly: true,
					},
				},
			},
		}
	}
}

export default ElementResponseForm
