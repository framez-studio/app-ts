import ErrorMessage from '@components/ErrorMessage'
import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import FormSectionLabel from '@components/FormSectionLabel'
import RadioInput from '@components/RadioInput'
import { usePushoverContext } from '@context/PushoverContext'

const PushoverConfigForm = () => {
	const {
		ui,
		state,
		updateDirection,
		updateNode,
		updateConstants,
		runPushover,
	} = usePushoverContext()

	return (
		<section className="form-container">
			<section className="form-main col-2">
				<FormSectionLabel
					props={{
						label: 'Control Node',
						tooltip:
							'Control node used to determine capacity curve. To set it, click the node you want to use on the structure',
						isActive: true,
					}}
					className="span-2"
				/>
				<FormInput
					props={{
						label: 'X Coordinate',
						labelCentered: true,
						value: String(state.node.x),
						onChange: (e) =>
							updateNode({ x: Number(e.target.value) }),
					}}
				/>
				<FormInput
					props={{
						label: 'Y Coordinate',
						labelCentered: true,
						value: String(state.node.y),
						onChange: (e) =>
							updateNode({ y: Number(e.target.value) }),
					}}
				/>
				{!state.isNodeValid && (
					<ErrorMessage
						props={{
							text: 'Please enter existing node coordinates',
						}}
						className="span-2"
					/>
				)}
				<FormSectionLabel
					props={{
						label: 'Pushover Direction',
						tooltip:
							'Direction of the force applied to the structure during the pushover analysis',
						isActive: true,
					}}
					className="span-2"
				/>

				<RadioInput
					props={{
						label: 'Left',
						checked: state.direction === 'left',
						onChange: (value) => {
							if (value) updateDirection('left')
						},
					}}
					className="jc-center"
				/>
				<RadioInput
					props={{
						label: 'Right',
						checked: state.direction === 'right',
						onChange: (value) => {
							if (value) updateDirection('right')
						},
					}}
					className="jc-center"
				/>
				<FormSectionLabel
					props={{
						label: 'Dynamic Constants',
						tooltip:
							'Values of the dynamic constants used in the pushover analysis for EHF distribution',
						isActive: true,
					}}
					className="span-2"
				/>
				<FormInput
					props={{
						label: 'Av',
						labelCentered: true,
						tooltip:
							'Effective peak horizontal velocity coefficient. Given on NSR-10 A.2.2.',
						value: String(state.constants.av),
						onChange: (e) =>
							updateConstants({ av: Number(e.target.value) }),
					}}
				/>
				<FormInput
					props={{
						label: 'Fv',
						labelCentered: true,
						tooltip:
							'Amplification coefficient that affects the acceleration in the zone of intermediate periods',
						value: String(state.constants.fv),
						onChange: (e) =>
							updateConstants({ fv: Number(e.target.value) }),
					}}
				/>
			</section>
			<section className="form-footer col-2">
				{ui.analysisError && (
					<ErrorMessage
						props={{
							text: 'Oops! There was an error running the analysis',
						}}
						className="span-2"
					/>
				)}
				{!ui.arePropsValid && (
					<ErrorMessage
						props={{
							text: 'Please fill all the fields and try again',
						}}
						className="span-2"
					/>
				)}
				<FormButton
					props={{ text: 'Run Pushover', onClick: runPushover }}
					className="span-2"
				/>
			</section>
		</section>
	)
}

export default PushoverConfigForm
