import { useState } from 'react'
import '@styles/Form.sass'
import ElementMechPropertiesForm from '@components/elementForm/ElementMechPropertiesForm'
import ElementReinforcementForm from '@components/elementForm/ElementReinforcementForm'

type PropFormSections = 'mech' | 'reinforcement'

const ElementPropertiesForm = () => {
	const [activeSection, setActiveSection] = useState<PropFormSections>('mech')

	switch (activeSection) {
		case 'mech':
			return (
				<ElementMechPropertiesForm
					props={{
						onButtonClick: () => setActiveSection('reinforcement'),
					}}
				/>
			)
		case 'reinforcement':
			return (
				<ElementReinforcementForm
					props={{ onButtonClick: () => setActiveSection('mech') }}
				/>
			)

		default:
			return <span>unknown properties state form</span>
	}
}

export default ElementPropertiesForm
