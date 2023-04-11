import { INode } from '@interfaces'
import { stringifyObjectValues } from '@utils/ui'
import { useImmer } from 'use-immer'

export interface INodeState {
	loads: {
		fx: string
		fy: string
		mz: string
	}
	coordinates: {
		x: string
		y: string
	}
	displacements: {
		dx: string
		dy: string
		rz: string
	}
	reactions: {
		fx: string
		fy: string
		mz: string
	}
}
export function useNodeState() {
	const initialState: INodeState = {
		loads: {
			fx: '',
			fy: '',
			mz: '',
		},
		coordinates: {
			x: '',
			y: '',
		},
		displacements: {
			dx: '',
			dy: '',
			rz: '',
		},
		reactions: {
			fx: '',
			fy: '',
			mz: '',
		},
	}
	const [state, updateState] = useImmer(initialState)

	function updateLoads(newLoads: Partial<INodeState['loads']>) {
		updateState((draft) => {
			draft.loads = { ...draft.loads, ...newLoads }
		})
	}
	function updateCoordinates(
		newCoordinates: Partial<INodeState['coordinates']>,
	) {
		updateState((draft) => {
			draft.coordinates = { ...draft.coordinates, ...newCoordinates }
		})
	}
	function updateDisplacements(
		newDisplacements: Partial<INodeState['displacements']>,
	) {
		updateState((draft) => {
			draft.displacements = {
				...draft.displacements,
				...newDisplacements,
			}
		})
	}
	function updateReactions(newReactions: Partial<INodeState['reactions']>) {
		updateState((draft) => {
			draft.reactions = {
				...draft.reactions,
				...newReactions,
			}
		})
	}
	function assignNodeState(node: INode) {
		updateState((draft) => {
			draft.loads = stringifyObjectValues(
				node.loads,
			) as INodeState['loads']
			draft.coordinates = stringifyObjectValues(
				node.coordinates('static'),
			) as INodeState['coordinates']
			draft.displacements = stringifyObjectValues(
				node.displacements,
			) as INodeState['displacements']
			draft.reactions = stringifyObjectValues(
				node.reactions,
			) as INodeState['reactions']
		})
	}

	return {
		state,
		updateLoads,
		updateCoordinates,
		updateDisplacements,
		updateReactions,
		assignNodeState,
	}
}
