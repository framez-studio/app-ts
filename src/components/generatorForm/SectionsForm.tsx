import '@styles/Form.sass'
import ElementFormSwitcher from '@components/elementForm/ElementFormSwitcher'
import { ElementContextProvider } from '@context/ElementContext'
import { useGeneratorContext } from '@context/GeneratorContext'
import RadioInput from '@components/RadioInput'

const SectionsForm = () => {
	const { state, columnsContext, beamsContext, setSectionsConfigToggle } =
		useGeneratorContext()
	const { sectionsConfigToggle: elementType } = state
	const value = elementType == 'column' ? columnsContext : beamsContext
	return (
		<ElementContextProvider props={{ value }}>
			<section className="generator-container">
				<section className="element-type-selector ">
					<RadioInput
						props={{
							label: 'Columns',
							checked: elementType == 'column',
							onChange: () => setSectionsConfigToggle('column'),
						}}
					/>
					<RadioInput
						props={{
							label: 'Beams',
							checked: elementType == 'beam',
							onChange: () => setSectionsConfigToggle('beam'),
						}}
					/>
				</section>
				<ElementFormSwitcher />
			</section>
		</ElementContextProvider>
	)
}

export default SectionsForm
