import React, { useState } from 'react'
import '@styles/Form.sass'
import AddBtn from '@components/svg/AddBtn'
import FormButton from '@components/FormButton'
import ElementReinforcementFormRow from '@components/elementForm/ElementReinforcementFormRow'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onButtonClick?(): void
	}
}

const ElementReinforcementForm: React.FC<Props> = ({ props }) => {
	const [reinforcement, setReinforcement] = useState<{}[]>([{}])

	const addRow = () => setReinforcement([...reinforcement, {}])

	const removeRow = (row: {}) => {
		let newState = reinforcement.filter((iRow) => iRow !== row)
		setReinforcement(newState)
	}

	const reinforcementInputs = reinforcement.map((row, index) => (
		<ElementReinforcementFormRow
			key={`row-${index}`}
			props={{ onDelete: () => removeRow(row) }}
		/>
	))
	return (
		<section className="form-container">
			<section className="form-main element-reinforcement">
				<span className="reinforcement-th">Bars Quantity</span>
				<span className="reinforcement-th">Bar Diameter</span>
				<span className="reinforcement-th">Distance From Edge</span>
				<span className="whitespace"></span>
				{reinforcementInputs}
				<span className="add-container">
					<AddBtn props={{ onClick: addRow }} />
				</span>
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
