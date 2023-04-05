import { useState } from 'react'
import '@styles/Form.sass'
import ElementMechPropertiesForm from '@components/elementForm/ElementMechPropertiesForm'
import ElementReinforcementForm from '@components/elementForm/ElementReinforcementForm'
import ElementDynamicPropertiesForm from './ElementDynamicPropertiesForm'

type PropFormSections = 'mech' | 'reinforcement' | 'dynamics'

const ElementPropertiesForm = () => {
	const [activeSection, setActiveSection] = useState<PropFormSections>('mech')

	switch (activeSection) {
		case 'mech':
			return (
				<ElementMechPropertiesForm
					props={{
						onRightBtn: () => setActiveSection('reinforcement'),
						onLeftBtn: () => setActiveSection('dynamics'),
					}}
				/>
			)
		case 'reinforcement':
			return (
				<ElementReinforcementForm
					props={{ onBackBtn: () => setActiveSection('mech') }}
				/>
			)
		case 'dynamics':
			return (
				<ElementDynamicPropertiesForm
					props={{ onBackBtn: () => setActiveSection('mech') }}
				/>
			)

		default:
			return <span>unknown properties state form</span>
	}
}

export default ElementPropertiesForm
