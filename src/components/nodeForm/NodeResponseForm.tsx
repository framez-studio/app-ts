import FormInput from '../FormInput'
import { useNodeSelectionState } from '@hooks/useNodeSelectionState'
import { responseFormatter } from '@utils/ui'

const NodeResponseForm = () => {
	const { displacements, reactions } = useNodeSelectionState()
	return (
		<section className="form-container">
			<section className="form-main node-response">
				<FormInput
					props={{
						label: 'Fx',
						suffix: 'kN',
						readonly: true,
						value: responseFormatter(Number(reactions.fx)),
					}}
				/>
				<FormInput
					props={{
						label: 'dx',
						suffix: 'mm',
						value: responseFormatter(Number(displacements.dx)),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'Fy',
						suffix: 'kN',
						value: responseFormatter(Number(reactions.fy)),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'dy',
						suffix: 'mm',
						value: responseFormatter(Number(displacements.dy)),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'Mz',
						suffix: 'kN.m',
						value: responseFormatter(Number(reactions.mz)),
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'rz',
						suffix: 'rad',
						value: responseFormatter(Number(displacements.rz)),
						readonly: true,
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default NodeResponseForm
