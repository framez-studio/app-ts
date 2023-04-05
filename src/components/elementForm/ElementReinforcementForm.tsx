import React from 'react'
import '@styles/Form.sass'
import FormButton from '@components/FormButton'
import ElementReinforcementTable from './ElementReinforcementTable'
import FormInput from '@components/FormInput'
import { useElementSteelState } from '@hooks/useElementSteelState'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onBackBtn?(): void
	}
}

const ElementReinforcementForm: React.FC<Props> = ({ props }) => {
	const reinforcement = useElementSteelState()
	const { state } = reinforcement
	return (
		<section className="form-container">
			<section className="form-main element-reinforcement col-2">
				<FormInput
					props={{
						label: `Young Module`,
						suffix: 'MPa',
						value: state.young,
						onChange: ($e) =>
							reinforcement.updateSteelYoung($e.target.value),
					}}
				/>
				<FormInput
					props={{
						label: 'Yielding Module',
						suffix: 'MPa',
						value: state.yield,
						onChange: ($e) =>
							reinforcement.updateYield($e.target.value),
					}}
				/>
				<ElementReinforcementTable
					props={{
						rows: state.rows,
						rowCreator: reinforcement.createEmptySteelRow,
						rowUpdater: reinforcement.updateSteelRow,
						rowDeleter: reinforcement.removeSteelRow,
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
