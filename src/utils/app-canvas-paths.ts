import { graphics } from '@config/app-canvas'
import { IElement, INode } from '@interfaces'
import { degsToRads } from './algebra'
import { globalMeterToCanvasCoords } from './app-canvas'
import {
	roundedRectPath,
	circlePath,
	arrowPath,
	linePath,
} from './canvas-paths'
import { nodeType } from './elements'

export function elementPath(
	element: IElement,
	ctx: CanvasRenderingContext2D,
	status: 'static' | 'displaced',
): Path2D {
	const path = new Path2D()
	const globalMeterPoints = {
		initial: element.nodes.initial.coordinates(status),
		final: element.nodes.final.coordinates(status),
	}
	const points = {
		initial: globalMeterToCanvasCoords(globalMeterPoints.initial, ctx),
		final: globalMeterToCanvasCoords(globalMeterPoints.final, ctx),
	}
	const alpha = degsToRads(90 - element.inclination)
	const delta = {
		x: (graphics.element.width / 2) * Math.cos(alpha),
		y: (graphics.element.width / 2) * Math.sin(alpha),
	}
	const vertices = [
		{
			x: points.initial.x - delta.x,
			y: points.initial.y + delta.y,
		},
		{
			x: points.initial.x + delta.x,
			y: points.initial.y - delta.y,
		},
		{
			x: points.final.x + delta.x,
			y: points.final.y - delta.y,
		},
		{
			x: points.final.x - delta.x,
			y: points.final.y + delta.y,
		},
	]
	vertices.forEach((vertex, indx) => {
		if (indx == 0) path.moveTo(vertex.x, vertex.y)
		else path.lineTo(vertex.x, vertex.y)
	})
	path.closePath()
	return path
}

export function nodePath(
	node: INode,
	ctx: CanvasRenderingContext2D,
	status: 'static' | 'displaced',
): Path2D {
	let path: Path2D
	const globalMeterPoint = node.coordinates(status)
	const point = globalMeterToCanvasCoords(globalMeterPoint, ctx)
	const type = nodeType(node)
	switch (type) {
		case 'fixed':
			path = roundedRectPath(point, graphics.supports.fixed)
			break
		default:
			path = circlePath(point, graphics.node.radius)
			break
	}
	return path
}

/**
 * Creates a path for a rectangular load. It assumes an origin at (0,0) and an x-axis pointing to the right. The load is drawn in horizontal direction.
 * @param lenghtInPixels - length of the load path in pixels
 * @returns - a Path object for the rectangular load
 */
export function rectangularLoadPath(lenghtInPixels: number): Path2D {
	const path = new Path2D()
	const { height, lineWidth, minSeparation } = graphics.loads

	const availableSpace = lenghtInPixels
	const nArrows = Math.floor(availableSpace / minSeparation)
	const separation = availableSpace / nArrows

	for (let i = 0; i <= nArrows; i++) {
		const x = i * separation
		const y = 0
		path.addPath(arrowPath({ x, y }, height, lineWidth))
	}
	const topLinePoints = {
		initial: {
			x: 0,
			y: -height,
		},
		final: {
			x: availableSpace,
			y: -height,
		},
	}
	const topLine = linePath(
		topLinePoints.initial,
		topLinePoints.final,
		lineWidth,
	)
	path.addPath(topLine)
	return path
}
