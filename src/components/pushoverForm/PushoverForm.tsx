import { usePushoverContext } from '@context/PushoverContext'
import PushoverFormSwitcher from './PushoverFormSwitcher'
import LoaderSliderBody from '@components/LoaderSliderBody'

const PushoverForm = () => {
	const { state } = usePushoverContext()
	const { isCalculating } = state

	if (isCalculating) {
		return <LoaderSliderBody props={{ text: 'Running pushover...' }} />
	} else {
		return <PushoverFormSwitcher />
	}
}

export default PushoverForm
