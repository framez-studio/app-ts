import { useState } from 'react'
import '@styles/Form.sass'
import AddBtn from '@components/svg/AddBtn'
import ElementReinforcementFormRow from './ElementReinforcementFormRow'

const ElementReinforcementTable = () => {
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
		<section className="element-reinforcement--table">
			<span className="reinforcement-th">Bars Quantity</span>
			<span className="reinforcement-th">Bar Diameter</span>
			<span className="reinforcement-th">Distance From Edge</span>
			<span className="whitespace"></span>
			{reinforcementInputs}
			<span className="add-container">
				<AddBtn props={{ onClick: addRow }} />
			</span>
		</section>
	)
}

export default ElementReinforcementTable
