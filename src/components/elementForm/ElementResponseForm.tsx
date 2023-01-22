import React from 'react'
import '@styles/Form.sass'
import FormDualInput from '@components/FormDualInput'

const ElementResponseForm = () => {
	const inputs = {
		axial: {
			title: 'Axial Force',
			first: { label: 'Initial Node', suffix: 'kN' },
			second: { label: 'Final Node', suffix: 'kN' },
		},
		shear: {
			title: 'Shear Force',
			first: { label: 'Initial Node', suffix: 'kN' },
			second: { label: 'Final Node', suffix: 'kN' },
		},
		bending: {
			title: 'Bending Moment',
			first: { label: 'Initial Node', suffix: 'kN.m' },
			second: { label: 'Final Node', suffix: 'kN.m' },
		},
	}
	return (
		<section className="form-container">
			<section className="form-main element-response">
				<FormDualInput props={inputs.axial} />
				<FormDualInput props={inputs.shear} />
				<FormDualInput props={inputs.bending} />
			</section>
		</section>
	)
}

export default ElementResponseForm
