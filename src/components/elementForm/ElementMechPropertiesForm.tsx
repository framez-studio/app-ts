import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import { useElementContext } from '@context/ElementContext'
import { useActiveSectionContext } from '@context/ActiveSectionContext'
import { inputUnitsFilter, outputUnitsFilter } from '@utils/ui'

const ElementMechPropertiesForm = () => {
	const { setActiveSection } = useActiveSectionContext()
	const { elementProps } = useElementContext()
	const { state, updateYoung, updateEpsilon, updateSectionDims, updateFc } =
		elementProps
	const { sectionDims, fc, young, epsilon } = state

	return (
		<section className="form-container">
			<section className="form-main element-properties col-2">
				<FormInput
					props={{
						label: 'Section Base',
						suffix: 'mm',
						value: outputUnitsFilter({
							value: sectionDims.base,
							from: 'm',
							to: 'mm',
						}),
						onBlur: ($e) => {
							const value = inputUnitsFilter({
								value: $e.target.value,
								from: 'mm',
								to: 'm',
							})
							updateSectionDims({ base: value })
						},
					}}
				/>
				<FormInput
					props={{
						label: 'Section Height',
						suffix: 'mm',
						value: outputUnitsFilter({
							value: sectionDims.height,
							from: 'm',
							to: 'mm',
						}),
						onBlur: ($e) => {
							const value = inputUnitsFilter({
								value: $e.target.value,
								from: 'mm',
								to: 'm',
							})
							updateSectionDims({ height: value })
						},
					}}
				/>
				<FormInput
					props={{
						label: `${String.fromCharCode(402)}'c`,
						tooltip: `Concrete's maximum compressive strength`,
						suffix: 'MPa',
						value: outputUnitsFilter({
							value: fc,
							from: 'kPa',
							to: 'MPa',
						}),
						onBlur: ($e) => {
							const value = inputUnitsFilter({
								value: $e.target.value,
								from: 'MPa',
								to: 'kPa',
							})
							updateFc(value)
						},
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
						value: outputUnitsFilter({
							value: young,
							from: 'kPa',
							to: 'MPa',
						}),
						onBlur: ($e) => {
							const value = inputUnitsFilter({
								value: $e.target.value,
								from: 'MPa',
								to: 'kPa',
							})
							updateYoung(value)
						},
					}}
				/>
				<FormInput
					props={{
						label: `Max. Strain`,
						tooltip: `Concrete's maximum compressive strain (${String.fromCharCode(
							949,
						)}) before yielding`,
						suffix: 'mm/mm',
						value: epsilon,
						onBlur: ($e) => updateEpsilon($e.target.value),
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
