import FormButton from '@components/FormButton'
import FormInput from '@components/FormInput'
import FormSectionLabel from '@components/FormSectionLabel'
import RadioInput from '@components/RadioInput'

const DefaultForm = () => {
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
						readonly: true,
					}}
				/>
				<FormInput
					props={{
						label: 'Y Coordinate',
						labelCentered: true,
						readonly: true,
					}}
				/>
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
						checked: true,
						onChange: () => {},
					}}
					className="jc-center"
				/>
				<RadioInput
					props={{
						label: 'Right',
						checked: false,
						onChange: () => {},
					}}
					className="jc-center"
				/>
				<FormSectionLabel
					props={{
						label: 'Dynamic Constants',
						tooltip:
							'Values of the dynamic constants used in the pushover analysis for HEF distribution',
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
					}}
				/>
				<FormInput
					props={{
						label: 'Fv',
						labelCentered: true,
						tooltip:
							'Amplification coefficient that affects the acceleration in the zone of intermediate periods',
					}}
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{ text: 'Run Pushover' }}
					className="span-2"
				/>
			</section>
		</section>
	)
}

export default DefaultForm
