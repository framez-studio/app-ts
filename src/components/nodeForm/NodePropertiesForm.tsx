import '@styles/Form.sass'
import FormInput from '../FormInput'
import { useNodeSelectionState } from '@hooks/useNodeSelectionState'

const NodePropertiesForm = () => {
	const { coordinates } = useNodeSelectionState()

	return (
		<section className="form-container">
			<section className="form-main node-properties">
				<FormInput
					props={{
						label: 'X Coordinate',
						suffix: 'm',
						value: coordinates.x,
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'Y Coordinate',
						suffix: 'm',
						value: coordinates.y,
						readonly: true,
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default NodePropertiesForm
