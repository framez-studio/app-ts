import { IStructure } from '@interfaces'
import { coordinates2D } from '@types'
import { IGraphicStructure } from '@types-ui'
import { scale, origin } from '@config'
import { UIElement, UINode } from '@classes'
import { extractContextDims } from '@utils'

export function metersToPixels(meters: number) {
	return (meters * scale.pixels) / scale.meters
}

export function globalPixelToCanvasCoords(
	coords: coordinates2D,
	ctx: CanvasRenderingContext2D,
): coordinates2D {
	let { height } = extractContextDims(ctx)
	let canvasCoords = {
		x: coords.x,
		y: height - coords.y,
	}
	return canvasCoords
}

export function globalMeterToCanvasCoords(
	coords: coordinates2D,
	ctx: CanvasRenderingContext2D,
): coordinates2D {
	let globalPixelCoords = {
		x: metersToPixels(coords.x) + origin.x,
		y: metersToPixels(coords.y) + origin.y,
	}
	return globalPixelToCanvasCoords(globalPixelCoords, ctx)
}

export function generateGraphicStructure(
	ctx: CanvasRenderingContext2D,
	structure: IStructure,
) {
	const graphicStructure: IGraphicStructure = {
		context: ctx,
		nodes: [],
		elements: [],
	}
	graphicStructure.nodes = structure.nodes.map(
		(node) => new UINode(node, ctx),
	)
	graphicStructure.elements = structure.elements.map(
		(element) => new UIElement(element, ctx),
	)
	console.log('graphic structure generated', graphicStructure)
	return graphicStructure
}

export function printStructure(structure: IGraphicStructure) {
	const { nodes, elements } = structure
	elements.forEach((element) => element.printOnContext())
	nodes.forEach((node) => node.printOnContext())
}
