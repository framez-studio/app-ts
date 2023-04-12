import React from 'react'
import FormInput from '@components/FormInput'
import DeleteBtn from '@components/svg/DeleteBtn'
import { ISteelRowState } from '@interfaces'
import { inputUnitsFilter, outputUnitsFilter } from '@utils/ui'

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
					value: outputUnitsFilter({
						value: row.diameter,
						from: 'm',
						to: 'mm',
					}),
					suffix: 'mm',
					onChange: ($e) => {
						const value = inputUnitsFilter({
							value: $e.target.value,
							from: 'mm',
							to: 'm',
						})
						updater(index, { diameter: value })
					},
				}}
			/>
			<FormInput
				props={{
					value: outputUnitsFilter({
						value: row.distance,
						from: 'm',
						to: 'mm',
					}),
					suffix: 'mm',
					onChange: ($e) => {
						const value = inputUnitsFilter({
							value: $e.target.value,
							from: 'mm',
							to: 'm',
						})
						updater(index, { distance: value })
					},
				}}
			/>
			<DeleteBtn props={{ onClick: () => deleter(index) }} />
		</>
	)
}

export default ElementReinforcementFormRow
