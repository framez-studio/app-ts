import { nodeLoads2DObject } from '@types'
import { INode } from '@interfaces'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/context/AppContext'

export function useNodeSelection() {
	const { state } = useAppContext()
	if (state.selection.type != 'node') throw new Error('No Node selected')

	const node = state.selection.object as INode

	const [loads, updateLoads] = useState({ ...node.loads })
	const [coordinates, updateCoordinates] = useState({
		...node.coordinates('static'),
	})
	const [displacements, updateDisplacements] = useState({
		...node.displacements,
	})

	function setLoads(newLoads: Partial<nodeLoads2DObject>) {
		node.setLoads(newLoads)
		updateLoads({ ...loads, ...newLoads })
	}

	useEffect(() => {
		updateLoads({ ...node.loads })
		updateCoordinates({ ...node.coordinates('static') })
	}, [node])
	useEffect(() => {
		updateDisplacements({ ...node.displacements })
	}, [node.displacements])

	return { loads, coordinates, displacements, setLoads }
}
