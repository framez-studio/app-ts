import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'

function StructureForm() {
	return (
		<section className="form-container">
			<section className="form-main col-2">
				<FormInput
					props={{
						label: 'Span Count:',
					}}
				/>
				<FormInput
					props={{
						label: 'Distance:',
						suffix: 'm',
					}}
				/>
				<FormInput
					props={{
						label: 'Level Count:',
					}}
				/>
				<FormInput
					props={{
						label: 'Height:',
						suffix: 'm',
					}}
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{
						text: 'Generate',
						onClick: () => console.log('generated'),
					}}
				/>
			</section>
		</section>
	)
}

export default StructureForm
