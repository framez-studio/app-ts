import React, { createContext, useContext } from 'react'
import { useInitialState } from '@hooks/useInitialState'
import { IAppState, IElement, INode, IUIStructure } from '@interfaces'

export interface IAppContext {
	state: IAppState
	graphicStructure: React.MutableRefObject<IUIStructure>
	setSelection(payload: {
		type: 'node' | 'element' | null
		object: INode | IElement | null
	}): void
}

const AppContext = createContext<IAppContext | undefined>(undefined)

export function useAppContext() {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error(
			'useAppContext must be used within a AppContext.Provider',
		)
	}
	return context
}

interface Props extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
	const value = useInitialState()
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
