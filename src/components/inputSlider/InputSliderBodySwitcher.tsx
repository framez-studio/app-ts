import React from 'react'
import { useAppContext } from '@context/AppContext'
import PushoverForm from '@components/pushoverForm/PushoverForm'
import ElementForm from '@components/elementForm/ElementForm'
import NodeForm from '@components/nodeForm/NodeForm'

interface Props extends React.HTMLProps<HTMLDivElement> {}
const InputSliderBodySwitcher: React.FC<Props> = () => {
	const { state } = useAppContext()

	switch (state.canvas.selection.type) {
		case 'node':
			return <NodeForm />
		case 'element':
			return <ElementForm />
		case null:
			return <PushoverForm />
		default:
			return <div>Something weird happened with Selection State</div>
	}
}

export default InputSliderBodySwitcher
