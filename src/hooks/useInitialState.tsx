import { useState } from 'react'
import { IAppState } from '@interfaces'
import { IAppContext } from '@context/AppContext'
import { structure } from '@config'

const initialState: IAppState = {
	structure: structure,
	selection: {
		type: null,
		object: null,
	},
}

export function useInitialState(): IAppContext {
	const [state, setState] = useState(initialState)

	return { state }
}
