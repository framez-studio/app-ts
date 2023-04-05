import React from 'react'
import { IFormSections } from '@types-ui'
import { useAppContext } from '@context/AppContext'
import DefaultForm from '@components/defaultForm/DefaultForm'
import NodeFormSwitcher from '@components/nodeForm/NodeFormSwitcher'
import ElementFormSwitcher from '@components/elementForm/ElementFormSwitcher'
import { ElementContextProvider } from '@context/ElementContext'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		activeSection: IFormSections
	}
}
const InputSliderBodySwitcher: React.FC<Props> = ({ props }) => {
	const { state } = useAppContext()
	const { activeSection } = props

	switch (state.canvas.selection.type) {
		case 'node':
			return <NodeFormSwitcher props={{ activeSection }} />
		case 'element':
			return (
				<ElementContextProvider>
					<ElementFormSwitcher props={{ activeSection }} />
				</ElementContextProvider>
			)
		case null:
			return <DefaultForm />
		default:
			return <div>Something weird happened with Selection State</div>
	}
}

export default InputSliderBodySwitcher
