import { IElementContext } from '@interfaces'
import { useElementDynamicState } from './useElementDynamicState'
import { useElementSelectionState } from './useElementSelectionState'
import { useElementSelectionSteelState } from './useElementSelectionSteelState'

export function useElementContextSelectionState(): IElementContext {
	const elementProps = useElementSelectionState()
	const elementSteel = useElementSelectionSteelState()
	const elementDynamics = useElementDynamicState()

	return { elementProps, elementSteel, elementDynamics }
}
