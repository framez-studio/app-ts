import { UIElement } from '@classes/ui/UIElement'
import { UINode } from '@classes/ui/UINode'
import { scale, origin, graphics } from '@config/app-canvas'
import { IElement, IStructure, IUIOutline } from '@interfaces'
import { coordinates2D } from '@types'
import { IGraphicStructure } from '@types-ui'
import { extractContextDims } from './canvas'
import { degsToRads } from './algebra'
import { rectangularLoadPath } from './app-canvas-paths'

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
	console.log('graphic structure generated')
	return graphicStructure
}

export function printStructure(structure: IGraphicStructure) {
	const { nodes, elements } = structure
	elements.forEach((element) => element.printOnContext())
	nodes.forEach((node) => node.printOnContext())
}
/**
 * Prints a load on an element in a canvas context according to its inclination and setting a positive x-axis from its initial to its final node.
 * @param element - Element to print load on
 * @param ctx - Canvas context
 * @param status - 'static' or 'displaced'
 */
export function printElementLoad(
	element: IElement,
	ctx: CanvasRenderingContext2D,
	status: 'static' | 'displaced',
): void {
	const globalMeterPoints = {
		initial: element.nodes.initial.coordinates(status),
		final: element.nodes.final.coordinates(status),
	}
	const points = {
		initial: globalMeterToCanvasCoords(globalMeterPoints.initial, ctx),
		final: globalMeterToCanvasCoords(globalMeterPoints.final, ctx),
	}
	const { radius } = graphics.node
	const { width } = graphics.element

	const availableSpace = metersToPixels(element.length) - 2 * radius
	const path = rectangularLoadPath(availableSpace)

	ctx.save()
	ctx.translate(points.initial.x, points.initial.y)
	ctx.rotate(-degsToRads(element.inclination))
	ctx.translate(radius, -width / 2)
	fillPath(path, ctx, graphics.loads.fill)
	ctx.restore()
}

export function fillPath(
	path: Path2D,
	ctx: CanvasRenderingContext2D,
	fill: string,
) {
	ctx.fillStyle = fill
	ctx.fill(path)
}

export function outlinePath(
	path: Path2D,
	ctx: CanvasRenderingContext2D,
	config: IUIOutline,
) {
	ctx.strokeStyle = config.color
	ctx.lineWidth = config.width
	ctx.stroke(path)
}
