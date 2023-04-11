import '@styles/Form.sass'
import AddBtn from '@components/svg/AddBtn'
import ElementReinforcementFormRow from './ElementReinforcementFormRow'
import { ISteelRowState } from '@interfaces'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		rows: ISteelRowState[]
		rowUpdater(index: number, newData: Partial<ISteelRowState>): void
		rowDeleter(index: number): void
		rowCreator(): void
	}
}

const ElementReinforcementTable: React.FC<Props> = ({ props }) => {
	const { rows, rowUpdater, rowDeleter, rowCreator } = props

	const reinforcementInputs = rows.map((row, index) => (
		<ElementReinforcementFormRow
			key={`row-${index}`}
			props={{
				index,
				row,
				deleter: rowDeleter,
				updater: rowUpdater,
			}}
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
				<AddBtn props={{ onClick: rowCreator }} />
			</span>
		</section>
	)
}

export default ElementReinforcementTable
