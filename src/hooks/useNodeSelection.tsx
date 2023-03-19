import { nodeLoads2DObject } from '@types'
import { INode } from '@interfaces'
import { useEffect, useState } from 'react'
import { useAppContext } from '@context/AppContext'
import { useStructureAPI } from '@hooks/useStructureAPI'

export function useNodeSelection() {
	const { state } = useAppContext()
	const { requestStructureSolver } = useStructureAPI()
	if (state.canvas.selection.type != 'node')
		throw new Error('No Node selected')

	const node = state.canvas.selection.object as INode

	const [loads, updateLoads] = useState({ ...node.loads })
	const [coordinates, updateCoordinates] = useState({
		...node.coordinates('static'),
	})
	const [displacements, updateDisplacements] = useState({
		...node.displacements,
	})
	const [reactions, updateReactions] = useState({ ...node.reactions })

	function setLoads(newLoads: Partial<nodeLoads2DObject>) {
		node.setLoads(newLoads)
		updateLoads({ ...loads, ...newLoads })
		requestStructureSolver()
	}

	useEffect(() => {
		updateLoads({ ...node.loads })
		updateCoordinates({ ...node.coordinates('static') })
	}, [node])
	useEffect(() => {
		updateDisplacements({ ...node.displacements })
		updateReactions({ ...node.reactions })
	}, [node.displacements])

	return { loads, coordinates, displacements, reactions, setLoads }
}
