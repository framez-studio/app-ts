import InputSliderHeader from '../inputSlider/InputSliderHeader'
import ElementFormSwitcher from './ElementFormSwitcher'
import { ElementContextProvider } from '@context/ElementContext'

const ElementForm = () => {
	return (
		<ElementContextProvider>
			<InputSliderHeader />
			<ElementFormSwitcher />
		</ElementContextProvider>
	)
}

export default ElementForm
