import { structure } from '@config'
import { UIStructure } from '@classes'
import { IGraphicStructure } from '@interfaces'
import { useRef } from 'react'
import { useAppContext } from '@context/AppContext'
import { layerToTypeMap } from '@utils'

export function useGraphicStructure(): IGraphicStructure {
	const { setSelection } = useAppContext()
	const graphicStructure = useRef(new UIStructure(structure))

	function printOnContext(ctx: CanvasRenderingContext2D) {
		graphicStructure.current.setContext(ctx)
		graphicStructure.current.printOnContext()
	}
	function pointerUpHandler(e: React.PointerEvent) {
		graphicStructure.current.pointerUpHandler(e)
		syncSelection()
	}
	function getSelected() {
		return graphicStructure.current.selected
	}
	function getGraphicElement(layer: string, index: number) {
		return graphicStructure.current.getGraphicElement(layer, index)
	}
	function pointerMoveHandler(e: React.PointerEvent) {
		graphicStructure.current.pointerMoveHandler(e)
	}
	function syncSelection(): void {
		const { layer, index } = getSelected()
		const existsSelection = layer != null && index != null
		const type = existsSelection ? layerToTypeMap[layer] : null
		const object = existsSelection
			? getGraphicElement(layer, index).object
			: null
		setSelection({ type, object })
	}
	return {
		printOnContext,
		pointerUpHandler,
		pointerMoveHandler,
		getSelected,
		getGraphicElement,
	}
}
