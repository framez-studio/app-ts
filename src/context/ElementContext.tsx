import { useElementDynamicState } from '@hooks/useElementDynamicState'
import { useElementSelectionState } from '@hooks/useElementSelectionState'
import { useElementSteelState } from '@hooks/useElementSteelState'
import { IElementContext } from '@interfaces'
import { createContext, useContext } from 'react'

const ElementContext = createContext<IElementContext | undefined>(undefined)

export function useElementContext() {
	const context = useContext(ElementContext)
	if (context === undefined) {
		throw new Error(
			'useElementContext must be used within a ElementContext.Provider',
		)
	}
	return context
}

interface Props extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode
}

export const ElementContextProvider: React.FC<Props> = ({ children }) => {
	const elementProps = useElementSelectionState()
	const elementSteel = useElementSteelState()
	const elementDynamics = useElementDynamicState()

	const value = { elementProps, elementSteel, elementDynamics }

	return (
		<ElementContext.Provider value={value}>
			{children}
		</ElementContext.Provider>
	)
}
