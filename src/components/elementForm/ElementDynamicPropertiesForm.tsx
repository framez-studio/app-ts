import React from 'react'
import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import CheckboxInput from '@components/CheckboxInput'
import { useElementDynamicState } from '@hooks/useElementDynamicState'
import FormSectionLabel from '@components/FormSectionLabel'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onBackBtn?(): void
	}
}

const ElementDynamicPropertiesForm: React.FC<Props> = ({ props }) => {
	const {
		state,
		updateCurvature,
		updateMoment,
		updateWeight,
		toggleAutomatic,
	} = useElementDynamicState()
	const { curvature, moment, weight } = state
	return (
		<section className="form-container">
			<section className="form-main element-properties col-2">
				<FormInput
					props={{
						label: 'Self Weight',
						tooltip: `Self weight will only be considered in Horizontal Equivalent Force load distribution. It wont't be considered as a service load.`,
						suffix: 'kN/m3',
						value: weight,
						onChange: ($e) => updateWeight($e.target.value),
					}}
					className="span-2"
				/>
				<FormSectionLabel
					props={{ label: 'Moment - Curvature', isActive: true }}
					className="span-2"
				/>
				<CheckboxInput
					props={{
						label: 'Automatic',
						tooltip:
							'Automatically calculate minimum and maximum Moment-Curvature values',
						checked: state.automatic,
						onChange: toggleAutomatic,
					}}
					className="span-2"
				/>
				<FormInput
					props={{
						label: 'Min. Curvature',
						suffix: 'rad',
						readonly: state.automatic,
						value: curvature.min,
						onChange: ($e) =>
							updateCurvature($e.target.value, 'min'),
					}}
				/>
				<FormInput
					props={{
						label: 'Min. Moment',
						suffix: 'kN.m',
						readonly: state.automatic,
						value: moment.min,
						onChange: ($e) => updateMoment($e.target.value, 'min'),
					}}
				/>
				<FormInput
					props={{
						label: 'Max. Curvature',
						suffix: 'rad',
						readonly: state.automatic,
						value: curvature.max,
						onChange: ($e) =>
							updateCurvature($e.target.value, 'max'),
					}}
				/>
				<FormInput
					props={{
						label: 'Max. Moment',
						suffix: 'kN.m',
						readonly: state.automatic,
						value: moment.max,
						onChange: ($e) => updateMoment($e.target.value, 'max'),
					}}
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{ text: 'Back', onClick: props?.onBackBtn }}
				/>
			</section>
		</section>
	)
}

export default ElementDynamicPropertiesForm
