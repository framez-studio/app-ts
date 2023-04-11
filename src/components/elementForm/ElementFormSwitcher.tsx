import { useActiveSectionContext } from '@context/ActiveSectionContext'
import ElementDynamicPropertiesForm from './ElementDynamicPropertiesForm'
import ElementLoadsForm from './ElementLoadsForm'
import ElementMechPropertiesForm from './ElementMechPropertiesForm'
import ElementReinforcementForm from './ElementReinforcementForm'
import ElementResponseForm from './ElementResponseForm'

const ElementFormSwitcher = () => {
	const { activeSection } = useActiveSectionContext()

	switch (activeSection) {
		case 'properties':
			return <ElementMechPropertiesForm />
		case 'steel':
			return <ElementReinforcementForm />
		case 'dynamics':
			return <ElementDynamicPropertiesForm />
		case 'loads':
			return <ElementLoadsForm />
		case 'response':
			return <ElementResponseForm />
		default:
			return <span> unknown element form</span>
	}
}

export default ElementFormSwitcher
