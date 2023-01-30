import React, { createContext, useContext } from 'react'
import { useInitialState } from '@/hooks/useInitialState'
import { IAppState } from '@interfaces'

export interface IAppContext {
	state: IAppState
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
