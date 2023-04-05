import React from 'react'
import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import ElementReinforcementTable from './ElementReinforcementTable'
import FormInput from '@components/FormInput'
import { useElementContext } from '@context/ElementContext'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onBackBtn?(): void
	}
}

const ElementReinforcementForm: React.FC<Props> = ({ props }) => {
	const { elementSteel } = useElementContext()
	const { state } = elementSteel

	return (
		<section className="form-container">
			<section className="form-main element-reinforcement col-2">
				<FormInput
					props={{
						label: `Young Module`,
						suffix: 'MPa',
						value: state.young,
						onChange: ($e) =>
							elementSteel.updateSteelYoung($e.target.value),
					}}
				/>
				<FormInput
					props={{
						label: 'Yielding Module',
						suffix: 'MPa',
						value: state.yield,
						onChange: ($e) =>
							elementSteel.updateYield($e.target.value),
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
					props={{ text: 'Back', onClick: props?.onBackBtn }}
				/>
			</section>
		</section>
	)
}

export default ElementReinforcementForm
