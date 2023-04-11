import { useEffect } from 'react'
import { useStructureAPI } from '@hooks/useStructureAPI'
import { useNodeSelection } from '@hooks/useNodeSelection'
import { INodeState, useNodeState } from '@hooks/useNodeState'

export function useNodeSelectionState() {
	const { requestStructureSolver } = useStructureAPI()
	const node = useNodeSelection()
	const nodeState = useNodeState()
	const { loads, coordinates, displacements, reactions } = nodeState.state

	function setLoads(newLoads: Partial<INodeState['loads']>) {
		nodeState.updateLoads(newLoads)
		node.setLoads({
			fx: Number(newLoads.fx ?? loads.fx),
			fy: Number(newLoads.fy ?? loads.fy),
			mz: Number(newLoads.mz ?? loads.mz),
		})
		requestStructureSolver()
	}

	useEffect(() => {
		nodeState.updateDisplacements({
			dx: node.displacements.dx.toString(),
			dy: node.displacements.dy.toString(),
			rz: node.displacements.rz.toString(),
		})
		nodeState.updateReactions({
			fx: node.reactions.fx.toString(),
			fy: node.reactions.fy.toString(),
			mz: node.reactions.mz.toString(),
		})
	}, [node.displacements])
	useEffect(() => nodeState.assignNodeState(node), [node])

	return { loads, coordinates, displacements, reactions, setLoads }
}
