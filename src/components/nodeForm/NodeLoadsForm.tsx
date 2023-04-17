import '@styles/Form.sass'
import FormInput from '../FormInput'
import { useNodeSelectionState } from '@hooks/useNodeSelectionState'

const NodeLoadsForm = () => {
	const { loads, setLoads } = useNodeSelectionState()
	return (
		<section className="form-container">
			<section className="form-main node-loads col-3">
				<FormInput
					props={{
						label: 'Fx',
						suffix: 'kN',
						value: loads.fx,
						onBlur: ($e) => setLoads({ fx: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Fy',
						suffix: 'kN',
						value: loads.fy,
						onBlur: ($e) => setLoads({ fy: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Mz',
						suffix: 'kN.m',
						value: loads.mz,
						onBlur: ($e) => setLoads({ mz: $e.target.value }),
					}}
				/>
			</section>
			<section className="form-footer col-2"></section>
		</section>
	)
}

export default NodeLoadsForm
