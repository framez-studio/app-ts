import React, { createContext, useContext } from 'react'
import { useInitialAppContext } from '@hooks/useInitialAppContext'
import { IAppContext } from '@interfaces'

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
	const value = useInitialAppContext()
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
