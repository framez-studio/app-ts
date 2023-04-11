import InputSliderHeader from '../inputSlider/InputSliderHeader'
import ElementFormSwitcher from './ElementFormSwitcher'
import { ElementContextProvider } from '@context/ElementContext'
import { useElementContextSelectionState } from '@hooks/useElementContextSelectionState'

const ElementForm = () => {
	const value = useElementContextSelectionState()
	return (
		<ElementContextProvider props={{ value }}>
			<InputSliderHeader />
			<ElementFormSwitcher />
		</ElementContextProvider>
	)
}

export default ElementForm
