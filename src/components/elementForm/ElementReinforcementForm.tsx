import React from 'react'
import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import ElementReinforcementTable from './ElementReinforcementTable'
import FormInput from '@components/FormInput'
import { useElementContext } from '@context/ElementContext'
import { useActiveSectionContext } from '@context/ActiveSectionContext'
import { inputUnitsFilter, outputUnitsFilter } from '@utils/ui'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onBackBtn?(): void
	}
}

const ElementReinforcementForm: React.FC<Props> = () => {
	const { setActiveSection } = useActiveSectionContext()
	const { elementSteel } = useElementContext()
	const { state } = elementSteel

	return (
		<section className="form-container">
			<section className="form-main element-reinforcement col-2">
				<FormInput
					props={{
						label: `Young`,
						tooltip: `Steel's young modulus`,
						suffix: 'MPa',
						value: outputUnitsFilter({
							value: state.young,
							from: 'kPa',
							to: 'MPa',
						}),
						onBlur: ($e) => {
							const value = inputUnitsFilter({
								value: $e.target.value,
								from: 'MPa',
								to: 'kPa',
							})
							elementSteel.updateSteelYoung(value)
						},
					}}
				/>
				<FormInput
					props={{
						label: `${String.fromCharCode(402)}y`,
						tooltip: `Steel's yield strength`,
						suffix: 'MPa',
						value: outputUnitsFilter({
							value: state.yield,
							from: 'kPa',
							to: 'MPa',
						}),
						onBlur: ($e) => {
							const value = inputUnitsFilter({
								value: $e.target.value,
								from: 'MPa',
								to: 'kPa',
							})
							elementSteel.updateYield(value)
						},
					}}
				/>
				<ElementReinforcementTable
					props={{
						rows: state.rows,
						rowCreator: elementSteel.createEmptySteelRow,
						rowUpdater: elementSteel.updateSteelRow,
						rowDeleter: elementSteel.removeSteelRow,
					}}
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{
						text: 'Back',
						onClick: () => setActiveSection('properties'),
					}}
				/>
			</section>
		</section>
	)
}

export default ElementReinforcementForm
