import { useRef, useState } from 'react'
import { IAppState, IElement, INode } from '@interfaces'
import { IAppContext } from '@context/AppContext'
import { structure } from '@config'
import { UIStructure } from '@classes/ui/UIStructure'

const initialState: IAppState = {
	structure: structure,
	selection: {
		type: null,
		object: null,
	},
}

export function useInitialState(): IAppContext {
	const [state, setState] = useState(initialState)
	const graphicStructure = useRef(new UIStructure(structure))

	function setSelection(payload: {
		type: 'node' | 'element' | null
		object: INode | IElement | null
	}) {
		const { type, object } = payload
		const { type: prevType, object: prevObject } = state.selection
		if (type == prevType && object == prevObject) return
		setState((prev) => ({ ...prev, selection: { type, object } }))
		// console.log('updated selection to: ', object)
	}

	return { state, graphicStructure, setSelection }
}
