import { useAppContext } from '@context/AppContext'
import FormInput from '../FormInput'
import { useNodeSelectionState } from '@hooks/useNodeSelectionState'
import { responseFormatter, outputUnitsFilter } from '@utils/ui'
import LoaderSliderBody from '@components/LoaderSliderBody'

const NodeResponseForm = () => {
	const context = useAppContext()
	const { displacements, reactions } = useNodeSelectionState()

	if (context.state.isSolving)
		return (
			<LoaderSliderBody
				props={{ text: 'Solving matrices and that stuff...' }}
			/>
		)
	return (
		<section className="form-container">
			<section className="form-main node-response col-2">
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
						value: outputUnitsFilter({
							value: displacements.dx,
							from: 'm',
							to: 'mm',
							formatter: responseFormatter,
						}),
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
						value: outputUnitsFilter({
							value: displacements.dy,
							from: 'm',
							to: 'mm',
							formatter: responseFormatter,
						}),
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
			<section className="form-footer col-2"></section>
		</section>
	)
}

export default NodeResponseForm
