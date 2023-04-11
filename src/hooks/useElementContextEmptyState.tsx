import { IElementContext } from '@interfaces'
import { useElementDynamicState } from './useElementDynamicState'
import { useElementState } from './useElementState'
import { useElementSteelState } from './useElementSteelState'

export function useElementContextEmptyState(): IElementContext {
	const elementProps = useElementState()
	const elementSteel = useElementSteelState()
	const elementDynamics = useElementDynamicState()
	return { elementProps, elementSteel, elementDynamics }
}
