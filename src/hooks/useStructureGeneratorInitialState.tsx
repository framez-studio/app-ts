import { IStructureGeneratorState } from '@interfaces'
import { useImmer } from 'use-immer'

export function useStructureGeneratorInitialState() {
	const [state, updateState] = useImmer<IStructureGeneratorState>({
		spans: {
			count: '1',
			separation: '2',
		},
		levels: {
			count: '1',
			separation: '2',
		},
		sectionsConfigToggle: 'beam',
		loadsConfigToggle: 'beam',
		arePropsValid: true,
	})
	return [state, updateState] as const
}
