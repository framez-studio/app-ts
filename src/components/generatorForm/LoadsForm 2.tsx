import RadioInput from '@components/RadioInput'
import ElementFormSwitcher from '@components/elementForm/ElementFormSwitcher'
import { ElementContextProvider } from '@context/ElementContext'
import { useGeneratorContext } from '@context/GeneratorContext'

const LoadsForm = () => {
	const { state, columnsContext, beamsContext, setLoadsConfigToggle } =
		useGeneratorContext()
	const { loadsConfigToggle: elementType } = state
	const value = elementType == 'column' ? columnsContext : beamsContext

	return (
		<ElementContextProvider props={{ value }}>
			<section className="generator-container">
				<section className="element-type-selector ">
					<RadioInput
						props={{
							label: 'Columns',
							checked: elementType == 'column',
							onChange: () => setLoadsConfigToggle('column'),
						}}
					/>
					<RadioInput
						props={{
							label: 'Beams',
							checked: elementType == 'beam',
							onChange: () => setLoadsConfigToggle('beam'),
						}}
					/>
				</section>
				<ElementFormSwitcher />
			</section>
		</ElementContextProvider>
	)
}

export default LoadsForm
