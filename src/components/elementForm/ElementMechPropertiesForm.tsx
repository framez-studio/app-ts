import React from 'react'
import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import { useElementSelectionState } from '@hooks/useElementSelectionState'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onButtonClick?(): void
	}
}

const ElementMechPropertiesForm: React.FC<Props> = ({ props }) => {
	const {
		young,
		setYoung,
		sectionDims,
		setSectionBase,
		setSectionHeight,
		epsilon,
		setEpsilon,
	} = useElementSelectionState()
	return (
		<section className="form-container">
			<section className="form-main element-properties">
				<FormInput
					props={{
						label: 'Young Module',
						suffix: 'MPa',
						value: String(young),
						onChange: ($e) => setYoung($e.target.value),
					}}
				/>
				<FormInput
					props={{
						label: `Max. Strain`,
						suffix: 'mm',
						value: String(epsilon),
						onChange: ($e) => setEpsilon($e.target.value),
					}}
				/>
				<FormInput
					props={{
						label: 'Section Base',
						suffix: 'mm',
						value: String(sectionDims.base),
						onChange: ($e) => setSectionBase($e.target.value),
					}}
				/>
				<FormInput
					props={{
						label: 'Section Height',
						suffix: 'mm',
						value: sectionDims.height,
						onChange: ($e) => setSectionHeight($e.target.value),
					}}
				/>
			</section>
			<section className="form-footer">
				<FormButton
					props={{
						text: 'Reinforcement',
						onClick: props?.onButtonClick,
					}}
				/>
			</section>
		</section>
	)
}

export default ElementMechPropertiesForm
