import React from 'react'
import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import CheckboxInput from '@components/CheckboxInput'
import FormSectionLabel from '@components/FormSectionLabel'
import { useActiveSectionContext } from '@context/ActiveSectionContext'
import { useElementContext } from '@context/ElementContext'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {}
}

const ElementDynamicPropertiesForm: React.FC<Props> = () => {
	const { setActiveSection } = useActiveSectionContext()
	const { elementDynamics } = useElementContext()
	const {
		state,
		updateCurvature,
		updateMoment,
		updateWeight,
		toggleAutomatic,
	} = elementDynamics
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
							updateCurvature({ min: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Min. Moment',
						suffix: 'kN.m',
						readonly: state.automatic,
						value: moment.min,
						onChange: ($e) =>
							updateMoment({ min: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Max. Curvature',
						suffix: 'rad',
						readonly: state.automatic,
						value: curvature.max,
						onChange: ($e) =>
							updateCurvature({ max: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Max. Moment',
						suffix: 'kN.m',
						readonly: state.automatic,
						value: moment.max,
						onChange: ($e) =>
							updateMoment({ max: $e.target.value }),
					}}
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{
						text: 'Back',
						onClick: () => setActiveSection('properties'),
					}}
				/>
			</section>
		</section>
	)
}

export default ElementDynamicPropertiesForm
