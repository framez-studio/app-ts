import { usePushoverContext } from '@context/PushoverContext'
import PushoverFormSwitcher from './PushoverFormSwitcher'
import Loader from '@components/Loader'
import LoaderSliderBody from '@components/LoaderSliderBody'

const PushoverForm = () => {
	const { state } = usePushoverContext()
	const { isCalculating } = state

	if (isCalculating) {
		return <LoaderSliderBody props={{ text: 'Pushover running...' }} />
	} else {
		return <PushoverFormSwitcher />
	}
}

export default PushoverForm
