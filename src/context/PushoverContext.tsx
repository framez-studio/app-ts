import { useInitialPushoverContext } from '@hooks/useInitialPushoverContext'
import { IStructurePushoverContext } from '@interfaces'
import { createContext, useContext } from 'react'

const PushoverContext = createContext<IStructurePushoverContext | undefined>(
	undefined,
)

export function usePushoverContext() {
	const context = useContext(PushoverContext)
	if (context === undefined) {
		throw new Error(
			'usePushoverContext must be used within a PushoverContext.Provider',
		)
	}
	return context
}

interface Props extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode
}

export const PushoverContextProvider: React.FC<Props> = ({ children }) => {
	const value = useInitialPushoverContext()
	return (
		<PushoverContext.Provider value={value}>
			{children}
		</PushoverContext.Provider>
	)
}
