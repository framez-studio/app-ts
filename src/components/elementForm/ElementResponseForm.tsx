import '@styles/Form.sass'
import FormDualInput from '@components/FormDualInput'
import { useElementSelection } from '@hooks/useElementSelection'
import { responseFormatter } from '@utils/ui'

const ElementResponseForm = () => {
	const { response } = useElementSelection()
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
						value: responseFormatter(response.initial.fx),
						readonly: true,
					},
				},
				second: {
					props: {
						label: 'Final Node',
						suffix: 'kN',
						value: responseFormatter(response.final.fx),
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
						value: responseFormatter(response.initial.fy),
						readonly: true,
					},
				},
				second: {
					props: {
						label: 'Final Node',
						suffix: 'kN',
						value: responseFormatter(response.final.fy),
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
						value: responseFormatter(response.initial.mz),
						readonly: true,
					},
				},
				second: {
					props: {
						label: 'Final Node',
						suffix: 'kN.m',
						value: responseFormatter(response.final.mz),
						readonly: true,
					},
				},
			},
		}
	}
}

export default ElementResponseForm
