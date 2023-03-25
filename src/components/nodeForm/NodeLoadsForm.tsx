import '@styles/Form.sass'
import FormInput from '../FormInput'
import { useNodeSelection } from '@hooks/useNodeSelection'

const NodeLoadsForm = () => {
	const { loads, setLoads } = useNodeSelection()
	return (
		<section className="form-container">
			<section className="form-main node-loads">
				<FormInput
					props={{
						label: 'Fx',
						suffix: 'kN',
						value: String(loads.fx),
						onBlur($e) {
							const { value } = $e.target
							setLoads({ fx: Number(value) })
						},
					}}
				/>
				<FormInput
					props={{
						label: 'Fy',
						suffix: 'kN',
						value: String(loads.fy),
						onBlur($e) {
							const { value } = $e.target
							setLoads({ fy: Number(value) })
						},
					}}
				/>
				<FormInput
					props={{
						label: 'Mz',
						suffix: 'kN.m',
						value: String(loads.mz),
						onBlur($e) {
							const { value } = $e.target
							setLoads({ mz: Number(value) })
						},
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default NodeLoadsForm
