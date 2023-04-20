import { useGeneratorContext } from '@context/GeneratorContext'
import ErrorMessage from '@components/ErrorMessage'
import FormButton from '@components/FormButton'
import FormSectionLabel from '@components/FormSectionLabel'
import GeneratorSpaceTable from '@components/generatorForm/GeneratorSpaceTable'
import { useActiveSectionContext } from '@context/ActiveSectionContext'

function StructureForm() {
	const {
		state,
		createLevelRow,
		updateLevelRow,
		deleteLevelRow,
		createSpanRow,
		updateSpanRow,
		deleteSpanRow,
		generateStructure,
	} = useGeneratorContext()
	const { setActiveSection } = useActiveSectionContext()

	return (
		<section className="form-container">
			<section className="form-main col-2">
				<div className="form-dual-input-title">
					<FormSectionLabel
						props={{
							label: 'Levels',
							tooltip:
								'Tapp on the add button to add a new level to the structure. Levels are added from the bottom up, so the first level in the list is the bottom level of the structure',
							isActive: true,
						}}
					/>
				</div>
				<GeneratorSpaceTable
					props={{
						rows: state.levels,
						rowCreator: createLevelRow,
						rowUpdater: updateLevelRow,
						rowDeleter: deleteLevelRow,
					}}
					className="span-2"
				/>
				<div className="form-dual-input-title">
					<FormSectionLabel
						props={{
							label: 'Spans',
							tooltip:
								'Tapp on the add button to add a new span to the structure. Spans are added from left to right, so the first span in the list is the leftmost span of the structure',
							isActive: true,
						}}
					/>
				</div>
				<GeneratorSpaceTable
					props={{
						rows: state.spans,
						rowCreator: createSpanRow,
						rowUpdater: updateSpanRow,
						rowDeleter: deleteSpanRow,
					}}
					className="span-2"
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{
						text: 'Back',
						onClick: () => setActiveSection('settings'),
					}}
					className="span-1"
				/>
				<FormButton
					props={{
						text: 'Generate',
						onClick: generateStructure,
					}}
					className="span-1"
				/>
				{!state.arePropsValid && (
					<ErrorMessage
						props={{
							text: `There are missing or invalid properties`,
						}}
						className="span-2"
					/>
				)}
			</section>
		</section>
	)
}

export default StructureForm
