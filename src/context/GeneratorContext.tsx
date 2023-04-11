import { useStructureGeneratorState } from '@hooks/useStructureGeneratorState'
import { IGeneratorContext } from '@interfaces'
import { createContext, useContext } from 'react'

const GeneratorContext = createContext<IGeneratorContext | undefined>(undefined)

export function useGeneratorContext() {
	const context = useContext(GeneratorContext)
	if (context === undefined) {
		throw new Error(
			'useGeneratorContext must be used within a GeneratorContext.Provider',
		)
	}
	return context
}

interface Props extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode
}

export const GeneratorContextProvider: React.FC<Props> = ({ children }) => {
	const value = useStructureGeneratorState()
	return (
		<GeneratorContext.Provider value={value}>
			{children}
		</GeneratorContext.Provider>
	)
}
