import React from 'react'
import '@styles/Form.sass'
import FormInput from '@components/FormInput'
import { useAppContext } from '@/context/AppContext'
import { IElement } from '@/entities/interfaces'

const ElementLoadsForm = () => {
	const { state } = useAppContext()
	const element = state.selection.object as IElement
	console.log(element)
	return (
		<section className="form-container">
			<section className="form-main element-loads">
				<FormInput
					props={{
						label: 'Distributed Load:',
						suffix: 'kN/m',
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default ElementLoadsForm
