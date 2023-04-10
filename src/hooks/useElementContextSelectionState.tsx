import { IElementContext } from '@interfaces'
import { useElementSelectionState } from './useElementSelectionState'
import { useElementSelectionSteelState } from './useElementSelectionSteelState'
import { useElementSelectionDynamicState } from './useElementSelectionDynamicState'

export function useElementContextSelectionState(): IElementContext {
	const elementProps = useElementSelectionState()
	const elementSteel = useElementSelectionSteelState()
	const elementDynamics = useElementSelectionDynamicState()

	return { elementProps, elementSteel, elementDynamics }
}
