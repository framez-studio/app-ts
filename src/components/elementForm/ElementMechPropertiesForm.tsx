import React from 'react'
import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import { useElementSelection } from '@hooks/useElementSelection'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onButtonClick?(): void
	}
}

const ElementMechPropertiesForm: React.FC<Props> = ({ props }) => {
	const { young, setYoung, sectionDims, setSectionBase, setSectionHeight } =
		useElementSelection()
	return (
		<section className="form-container">
			<section className="form-main element-properties">
				<FormInput
					props={{
						label: 'Young Modulus',
						suffix: 'MPa',
						value: String(young),
						onChange: ($e) => setYoung(Number($e.target.value)),
					}}
				/>
				<FormInput
					props={{
						label: 'Section Base',
						suffix: 'mm',
						value: String(sectionDims.base),
						onChange: ($e) =>
							setSectionBase(Number($e.target.value)),
					}}
				/>
				<FormInput
					props={{
						label: 'Section Height',
						suffix: 'mm',
						value: String(sectionDims.height),
						onChange: ($e) =>
							setSectionHeight(Number($e.target.value)),
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
