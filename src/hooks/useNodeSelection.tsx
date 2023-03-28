import { useAppContext } from '@context/AppContext'
import { INode } from '@interfaces'

export function useNodeSelection() {
	const { state } = useAppContext()

	if (state.canvas.selection.type != 'node')
		throw new Error('No Node selected')

	const node = state.canvas.selection.object as INode

	return node
}
