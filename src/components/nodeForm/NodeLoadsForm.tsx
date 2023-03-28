import '@styles/Form.sass'
import FormInput from '../FormInput'
import { useNodeSelectionState } from '@hooks/useNodeSelectionState'

const NodeLoadsForm = () => {
	const { loads, setLoads } = useNodeSelectionState()
	return (
		<section className="form-container">
			<section className="form-main node-loads">
				<FormInput
					props={{
						label: 'Fx',
						suffix: 'kN',
						value: loads.fx,
						onChange: ($e) => setLoads({ fx: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Fy',
						suffix: 'kN',
						value: loads.fy,
						onChange: ($e) => setLoads({ fy: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Mz',
						suffix: 'kN.m',
						value: loads.mz,
						onChange: ($e) => setLoads({ mz: $e.target.value }),
					}}
				/>
			</section>
			<section className="form-footer"></section>
		</section>
	)
}

export default NodeLoadsForm
