import FormInput from '../FormInput'
import { useNodeSelection } from '@hooks/useNodeSelection'
import { responseFormatter } from '@utils/ui'

const NodeResponseForm = () => {
	const { displacements, reactions } = useNodeSelection()
	return (
		<section className="form-container">
			<section className="form-main node-response">
				<FormInput
					props={{
						label: 'Fx',
						suffix: 'kN',
						readonly: true,
						value: responseFormatter(reactions.fx),
					}}
				/>
				<FormInput
					props={{
						label: 'dx',
						suffix: 'mm',
						value: responseFormatter(displacements.dx),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'Fy',
						suffix: 'kN',
						value: responseFormatter(reactions.fy),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'dy',
						suffix: 'mm',
						value: responseFormatter(displacements.dy),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'Mz',
						suffix: 'kN.m',
						value: responseFormatter(reactions.mz),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'rz',
						suffix: 'rad',
						value: responseFormatter(displacements.rz),
						readonly: true,
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default NodeResponseForm
