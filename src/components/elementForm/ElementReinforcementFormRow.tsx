import React from 'react'
import FormInput from '@components/FormInput'
import DeleteBtn from '@components/svg/DeleteBtn'
import { ISteelRowState } from '@interfaces'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		index: number
		row: ISteelRowState
		updater(index: number, newData: Partial<ISteelRowState>): void
		deleter(index: number): void
	}
}

const ElementReinforcementFormRow: React.FC<Props> = ({ props }) => {
	const { index, row, updater, deleter } = props
	return (
		<>
			<FormInput
				props={{
					value: row.quantity,
					onChange: ($e) =>
						updater(index, { quantity: $e.target.value }),
				}}
			/>
			<FormInput
				props={{
					value: row.diameter,
					suffix: 'mm',
					onChange: ($e) =>
						updater(index, { diameter: $e.target.value }),
				}}
			/>
			<FormInput
				props={{
					value: row.distance,
					suffix: 'mm',
					onChange: ($e) =>
						updater(index, { distance: $e.target.value }),
				}}
			/>
			<DeleteBtn props={{ onClick: () => deleter(index) }} />
		</>
	)
}

export default ElementReinforcementFormRow
