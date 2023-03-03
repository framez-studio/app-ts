import { ICanvasObjectType, IUILayer, IUILayerType } from '@types-ui'
import { coordinates2D } from '@types'

export interface IUICoordMatch {
	layer: IUILayerType | null
	index: number | null
}

export function checkCoordsMatchTroughLayers(
	ctx: CanvasRenderingContext2D,
	layers: IUILayer[],
	{ x, y }: coordinates2D,
): IUICoordMatch {
	let match: IUICoordMatch = { layer: null, index: null }

	for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
		if (match.index) break
		const layer = layers[layerIndex]

		for (
			let elementIndex = 0;
			elementIndex < layer.elements.length;
			elementIndex++
		) {
			const element = layer.elements[elementIndex]
			let coincidence = ctx.isPointInPath(element.path, x, y)
			if (!coincidence) continue
			match = { layer: layer.name, index: elementIndex }
			break
		}
	}
	return match
}

export const layerToTypeMap: { [key in IUILayerType]: ICanvasObjectType } = {
	nodes: 'node',
	elements: 'element',
}
