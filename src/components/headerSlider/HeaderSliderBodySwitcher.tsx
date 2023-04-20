import { useActiveSectionContext } from '@context/ActiveSectionContext'
import SettingsForm from './SettingsForm'
import GeneratorBody from '@components/generatorForm/GeneratorBody'

const HeaderSliderBodySwitcher = () => {
	const { activeSection } = useActiveSectionContext()

	switch (activeSection) {
		case 'settings':
			return <SettingsForm />
		default:
			return <GeneratorBody />
	}
}

export default HeaderSliderBodySwitcher
