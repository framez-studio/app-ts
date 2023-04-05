import React from 'react'
import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import { useElementSelectionState } from '@hooks/useElementSelectionState'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onLeftBtn?(): void
		onRightBtn?(): void
	}
}

const ElementMechPropertiesForm: React.FC<Props> = ({ props }) => {
	const { state, updateYoung, updateSectionDims, updateEpsilon } =
		useElementSelectionState()

	return (
		<section className="form-container">
			<section className="form-main element-properties col-2">
				<FormInput
					props={{
						label: 'Young Module',
						suffix: 'MPa',
						value: state.young,
						onChange: ($e) => updateYoung($e.target.value),
					}}
				/>
				<FormInput
					props={{
						label: `Max. Strain`,
						suffix: 'mm',
						value: state.epsilon,
						onChange: ($e) => updateEpsilon($e.target.value),
					}}
				/>
				<FormInput
					props={{
						label: 'Section Base',
						suffix: 'mm',
						value: state.sectionDims.base,
						onChange: ($e) =>
							updateSectionDims({ base: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Section Height',
						suffix: 'mm',
						value: state.sectionDims.height,
						onChange: ($e) =>
							updateSectionDims({ height: $e.target.value }),
					}}
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{
						text: 'Dynamic Config.',
						onClick: props?.onLeftBtn,
					}}
				/>
				<FormButton
					props={{
						text: 'Reinforcement',
						onClick: props?.onRightBtn,
					}}
				/>
			</section>
		</section>
	)
}

export default ElementMechPropertiesForm
