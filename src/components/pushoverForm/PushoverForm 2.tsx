import { PushoverContextProvider } from '@context/PushoverContext'
import PushoverFormSwitcher from './PushoverFormSwitcher'

const PushoverForm = () => {
	return (
		<PushoverContextProvider>
			<PushoverFormSwitcher />
		</PushoverContextProvider>
	)
}

export default PushoverForm
