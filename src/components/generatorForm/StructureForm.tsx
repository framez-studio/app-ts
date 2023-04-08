import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import { useGeneratorContext } from '@context/GeneratorContext'

function StructureForm() {
	const { state, updateLevels, updateSpans, generateStructure } =
		useGeneratorContext()

	return (
		<section className="form-container">
			<section className="form-main col-2">
				<FormInput
					props={{
						label: 'Span Count:',
						value: state.spans.count,
						onChange: (e) => updateSpans({ count: e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Distance:',
						suffix: 'm',
						value: state.spans.distance,
						onChange: (e) =>
							updateSpans({ distance: e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Level Count:',
						value: state.levels.count,
						onChange: (e) =>
							updateLevels({ count: e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Height:',
						suffix: 'm',
						value: state.levels.height,
						onChange: (e) =>
							updateLevels({ height: e.target.value }),
					}}
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{
						text: 'Generate',
						onClick: generateStructure,
					}}
					className="span-2"
				/>
			</section>
		</section>
	)
}

export default StructureForm
