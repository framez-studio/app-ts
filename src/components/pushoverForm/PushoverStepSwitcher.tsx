import '@styles/StepSwitcher.sass'
import { usePushoverContext } from '@context/PushoverContext'
import FormInput from '@components/FormInput'
import ArrowLeftBtn from '@components/svg/ArrowLeftBtn'
import ArrowRightBtn from '@components/svg/ArrowRightBtn'

const PushoverStepSwitcher = () => {
	const { ui, updateSelectedStep } = usePushoverContext()
	const { step } = ui.selected
	return (
		<section className="step-switcher-container">
			<ArrowLeftBtn
				props={{ onClick: () => updateSelectedStep(step - 1) }}
			/>
			<FormInput
				props={{ label: 'Step', value: String(step), readonly: true }}
				className="jc-center"
			/>
			<ArrowRightBtn
				props={{ onClick: () => updateSelectedStep(step + 1) }}
			/>
		</section>
	)
}

export default PushoverStepSwitcher
