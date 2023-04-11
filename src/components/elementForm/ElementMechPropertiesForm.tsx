import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import { useElementContext } from '@context/ElementContext'
import { useActiveSectionContext } from '@context/ActiveSectionContext'

const ElementMechPropertiesForm = () => {
	const { setActiveSection } = useActiveSectionContext()
	const { elementProps } = useElementContext()
	const { state, updateYoung, updateEpsilon, updateSectionDims, updateFc } =
		elementProps

	return (
		<section className="form-container">
			<section className="form-main element-properties col-2">
				<FormInput
					props={{
						label: 'Section Base',
						suffix: 'mm',
						value: state.sectionDims.base,
						onChange: ($e) =>
							updateSectionDims({ base: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: 'Section Height',
						suffix: 'mm',
						value: state.sectionDims.height,
						onChange: ($e) =>
							updateSectionDims({ height: $e.target.value }),
					}}
				/>
				<FormInput
					props={{
						label: `${String.fromCharCode(402)}'c`,
						tooltip: `Concrete's maximum compressive strength`,
						suffix: 'MPa',
						value: state.fc,
						onChange: ($e) => updateFc($e.target.value),
					}}
				/>
				<FormInput
					props={{
						label: 'Young',
						tooltip: `Concrete's Young's modulus. When changing ${String.fromCharCode(
							402,
						)}'c value, Framez will automatically suggest a value based on E=3900${String.fromCharCode(
							8730,
						)}${String.fromCharCode(402)}'c`,
						suffix: 'MPa',
						value: state.young,
						onChange: ($e) => updateYoung($e.target.value),
					}}
				/>
				<FormInput
					props={{
						label: `Max. Strain`,
						tooltip: `Concrete's maximum compressive strain (${String.fromCharCode(
							949,
						)}) before yielding`,
						suffix: 'mm',
						value: state.epsilon,
						onChange: ($e) => updateEpsilon($e.target.value),
					}}
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{
						text: 'Dynamic Config.',
						onClick: () => setActiveSection('dynamics'),
					}}
				/>
				<FormButton
					props={{
						text: 'Reinforcement',
						onClick: () => setActiveSection('steel'),
					}}
				/>
			</section>
		</section>
	)
}

export default ElementMechPropertiesForm
