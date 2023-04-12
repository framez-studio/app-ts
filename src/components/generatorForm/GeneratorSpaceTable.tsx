import '@styles/StructureGenerator.sass'
import AddBtn from '@components/svg/AddBtn'
import { IStructureSpace } from '@interfaces'
import GeneratorSpaceRow from './GeneratorSpaceRow'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		rows: IStructureSpace[]
		rowUpdater(index: number, newData: Partial<IStructureSpace>): void
		rowDeleter(index: number): void
		rowCreator(): void
	}
}

const GeneratorSpaceTable: React.FC<Props> = ({ props, className }) => {
	const { rows, rowUpdater, rowDeleter, rowCreator } = props

	const inputRows = rows.map((row, index) => (
		<GeneratorSpaceRow
			key={`row-${index}`}
			props={{ index, row, updater: rowUpdater, deleter: rowDeleter }}
		/>
	))
	return (
		<section className={`generator--table ${className ?? ''}`}>
			<span className="generator-th">Quantity</span>
			<span className="generator-th">Lenght</span>
			<span className="whitespace"></span>
			{inputRows}
			<span className="add-container">
				<AddBtn props={{ onClick: rowCreator }} />
			</span>
		</section>
	)
}

export default GeneratorSpaceTable
