import { useMemo } from 'react'

export function useWorkers() {
	const StaticWorker: Worker = useMemo(
		() =>
			new Worker(new URL('../workers/StaticSolver.ts', import.meta.url), {
				type: 'module',
			}),
		[],
	)
	const PushoverWorker: Worker = useMemo(
		() =>
			new Worker(
				new URL('../workers/PushoverSolver.ts', import.meta.url),
				{ type: 'module' },
			),
		[],
	)

	return { StaticWorker, PushoverWorker }
}
