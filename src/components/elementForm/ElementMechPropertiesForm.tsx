import React from 'react'
import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onButtonClick?(): void
	}
}

const ElementMechPropertiesForm: React.FC<Props> = ({ props }) => {
	return (
		<section className="form-container">
			<section className="form-main element-properties">
				<FormInput props={{ label: 'Young Modulus', suffix: 'MPa' }} />
				<FormInput props={{ label: 'Section Base', suffix: 'mm' }} />
				<FormInput props={{ label: 'Section Height', suffix: 'mm' }} />
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
