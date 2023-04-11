import { usePushoverContext } from '@context/PushoverContext'
import PushoverConfigForm from './PushoverConfigForm'
import PushoverGraphForm from './PushoverGraphForm'
import PushoverDataForm from './PushoverDataForm'

function PushoverFormSwitcher() {
	const { ui } = usePushoverContext()
	const { activeSection } = ui

	switch (activeSection) {
		case 'config':
			return <PushoverConfigForm />
		case 'graph':
			return <PushoverGraphForm />
		case 'data':
			return <PushoverDataForm />
		default:
			return <span>unknown pushover form</span>
	}
}

export default PushoverFormSwitcher
