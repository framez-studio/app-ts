import React from 'react'
import '@styles/Form.sass'
import FormInput from '../FormInput'
import { useNodeSelection } from '@/hooks/useNodeSelection'

const NodePropertiesForm = () => {
	const { coordinates } = useNodeSelection()

	return (
		<section className="form-container">
			<section className="form-main node-properties">
				<FormInput
					props={{
						label: 'X Coordinate',
						suffix: 'm',
						value: String(coordinates.x),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'Y Coordinate',
						suffix: 'm',
						value: String(coordinates.y),
						readonly: true,
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default NodePropertiesForm
