import { IElementContext } from '@interfaces'
import { useElementDynamicState } from './useElementDynamicState'
import { useElementSelectionState } from './useElementSelectionState'
import { useElementSteelState } from './useElementSteelState'

export function useElementContextSelectionState(): IElementContext {
	const elementProps = useElementSelectionState()
	const elementSteel = useElementSteelState()
	const elementDynamics = useElementDynamicState()

	return { elementProps, elementSteel, elementDynamics }
}
