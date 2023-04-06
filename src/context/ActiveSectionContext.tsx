import { IActiveSectionContext } from '@interfaces'
import { IFormSections } from '@types-ui'
import { createContext, useContext, useState } from 'react'

const ActiveSectionContext = createContext<IActiveSectionContext | undefined>(
	undefined,
)

export function useActiveSectionContext() {
	const context = useContext(ActiveSectionContext)
	if (context === undefined) {
		throw new Error(
			'useActiveSectionContext must be used within a ActiveSectionContext.Provider',
		)
	}
	return context
}

interface Props extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode
}

export const ActiveSectionContextProvider: React.FC<Props> = ({ children }) => {
	const [activeSection, setActiveSection] =
		useState<IFormSections>('properties')
	const value = { activeSection, setActiveSection }

	return (
		<ActiveSectionContext.Provider value={value}>
			{children}
		</ActiveSectionContext.Provider>
	)
}
