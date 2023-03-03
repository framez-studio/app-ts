import React from 'react'
import { useAppContext } from '@/context/AppContext'
import ElementForm from './elementForm/ElementForm'
import NodeForm from './nodeForm/NodeForm'

const InputSliderBodySwitcher = () => {
	const { state } = useAppContext()
	switch (state.selection.type) {
		case 'node':
			return <NodeForm />
		case 'element':
			return <ElementForm />
		case null:
			return <div>No Selection</div>
		default:
			return <div>Something weird happened with Selection State</div>
	}
}

export default InputSliderBodySwitcher
