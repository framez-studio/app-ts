import FormInput from '@components/FormInput'
import DeleteBtn from '@components/svg/DeleteBtn'
import { IStructureSpace } from '@interfaces'
import React from 'react'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		index: number
		row: IStructureSpace
		updater(index: number, newData: Partial<IStructureSpace>): void
		deleter(index: number): void
	}
}

const GeneratorSpaceRow: React.FC<Props> = ({ props }) => {
	const { index, row, updater, deleter } = props
	return (
		<>
			<FormInput
				props={{
					value: row.count,
					onChange: ($e) =>
						updater(index, { count: $e.target.value }),
				}}
			/>
			<FormInput
				props={{
					value: row.separation,
					suffix: 'm',
					onChange: ($e) =>
						updater(index, { separation: $e.target.value }),
				}}
			/>
			<DeleteBtn props={{ onClick: () => deleter(index) }} />
		</>
	)
}

export default GeneratorSpaceRow
