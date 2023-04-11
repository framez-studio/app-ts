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
	props: { value: IElementContext }
}

export const ElementContextProvider: React.FC<Props> = ({
	children,
	props,
}) => {
	return (
		<ElementContext.Provider value={props.value}>
			{children}
		</ElementContext.Provider>
	)
}
