import { useAppContext } from '@context/AppContext'
import { IElement } from '@interfaces'

export function useElementSelection() {
	const context = useAppContext()
	const { state } = context

	if (state.canvas.selection.type != 'element')
		throw new Error('No Element selected')

	const element = state.canvas.selection.object as IElement

	return element
}
