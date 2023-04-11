import { useAppContext } from '@context/AppContext'
import { INode } from '@interfaces'
import { useEffect, useState } from 'react'

export function usePushoverControlNode() {
	const { state } = useAppContext()
	const { selection } = state.canvas

	const [node, setNode] = useState({ x: '', y: '' })

	useEffect(() => {
		if (selection.type !== 'node') {
			setNode({ x: '', y: '' })
		} else {
			const selectedNode = selection.object as INode
			const { x, y } = selectedNode.coordinates('static')
			setNode({ x: String(x), y: String(y) })
		}
	}, [selection])

	return { node, setNode }
}
