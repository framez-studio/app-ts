import { useAppContext } from '@context/AppContext'
import ElementForm from './elementForm/ElementForm'
import NodeForm from './nodeForm/NodeForm'
import DefaultForm from './defaultForm/DefaultForm'

const InputSliderBodySwitcher = () => {
	const { state } = useAppContext()
	switch (state.canvas.selection.type) {
		case 'node':
			return <NodeForm />
		case 'element':
			return <ElementForm />
		case null:
			return <DefaultForm />
		default:
			return <div>Something weird happened with Selection State</div>
	}
}

export default InputSliderBodySwitcher
