import { IStructureGeneratorState } from '@interfaces'
import { useImmer } from 'use-immer'

export function useStructureGeneratorInitialState() {
	const [state, updateState] = useImmer<IStructureGeneratorState>({
		spans: {
			count: '',
			distance: '',
		},
		levels: {
			count: '',
			height: '',
		},
		sectionsConfigToggle: 'beam',
		loadsConfigToggle: 'beam',
	})
	return [state, updateState] as const
}
