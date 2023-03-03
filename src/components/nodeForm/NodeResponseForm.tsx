import React from 'react'
import FormInput from '../FormInput'
import { useNodeSelection } from '@/hooks/useNodeSelection'

const NodeResponseForm = () => {
	const { displacements } = useNodeSelection()
	return (
		<section className="form-container">
			<section className="form-main node-response">
				<FormInput
					props={{
						label: 'Fx',
						suffix: 'kN',
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'dx',
						suffix: 'mm',
						value: String(displacements.dx),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'Fy',
						suffix: 'kN',
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'dy',
						suffix: 'mm',
						value: String(displacements.dy),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'Mz',
						suffix: 'rad',
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'rz',
						suffix: 'kN.m',
						value: String(displacements.rz),
						readonly: true,
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default NodeResponseForm
