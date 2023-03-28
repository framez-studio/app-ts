import React from 'react'
import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import ElementReinforcementTable from './ElementReinforcementTable'
import FormInput from '@components/FormInput'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onButtonClick?(): void
	}
}

const ElementReinforcementForm: React.FC<Props> = ({ props }) => {
	return (
		<section className="form-container">
			<section className="form-main element-reinforcement">
				<FormInput
					props={{ label: 'Yielding Module', suffix: 'MPa' }}
				/>
				<FormInput props={{ label: `Max. Strain`, suffix: 'mm' }} />
				<ElementReinforcementTable />
			</section>
			<section className="form-footer">
				<FormButton
					props={{ text: 'Back', onClick: props?.onButtonClick }}
				/>
			</section>
		</section>
	)
}

export default ElementReinforcementForm
