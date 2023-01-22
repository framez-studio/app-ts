import React from 'react'
import '@styles/Form.sass'
import FormInput from '@components/FormInput'

const ElementLoadsForm = () => {
	return (
		<section className="form-container">
			<section className="form-main element-loads">
				<FormInput
					props={{ label: 'Distributed Load:', suffix: 'kN/m' }}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default ElementLoadsForm
