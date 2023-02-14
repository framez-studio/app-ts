import { IElement, INode, IStructure } from '@interfaces'
import { scale, origin, graphics } from '@config'
import { coordinates2D } from '@/entities/types'
import { degsToRads, nodeType } from '@utils'
import { IAppCanvasCamera, IPathElement, IPathNode } from '@types-ui'

export function metersToPixels(meters: number) {
	return (meters * scale.pixels) / scale.meters
}

export function extractContextDims(ctx: CanvasRenderingContext2D) {
	let canvas = ctx.canvas
	return { width: canvas.width, height: canvas.height }
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
	return path
}

export function nodePath(
	node: INode,
	ctx: CanvasRenderingContext2D,
	status: 'static' | 'displaced',
): Path2D {
	const path = new Path2D()
	const globalMeterPoint = node.coordinates(status)
	const point = globalMeterToCanvasCoords(globalMeterPoint, ctx)
	const type = nodeType(node)
	switch (type) {
		case 'fixed':
			roundedRect(path, point, graphics.supports.fixed)
			break
		default:
			circle(path, point)
			break
	}
	return path
}

export function printStructure(
	ctx: CanvasRenderingContext2D,
	structure: IStructure,
	status: 'static' | 'displaced',
) {
	const elements: IPathElement[] = structure.elements.map((element) => ({
		object: element,
		path: elementPath(element, ctx, status),
	}))
	const nodes: IPathNode[] = structure.nodes.map((node) => ({
		object: node,
		path: nodePath(node, ctx, status),
	}))
	elements.forEach((element) => {
		ctx.fillStyle = graphics.element.fill
		ctx.fill(element.path)
	})
	nodes.forEach((node) => {
		ctx.fillStyle = graphics.node.fill
		ctx.fill(node.path)
	})
}
function roundedRect(
	path: Path2D,
	center: coordinates2D,
	dims: { width: number; height: number; radius: number },
) {
	let x = center.x - dims.width / 2
	let y = center.y - dims.height / 2
	let { height, radius, width } = dims
	path.moveTo(x, y + radius)
	path.arcTo(x, y + height, x + radius, y + height, radius)
	path.arcTo(x + width, y + height, x + width, y + height - radius, radius)
	path.arcTo(x + width, y, x + width - radius, y, radius)
	path.arcTo(x, y, x, y + radius, radius)
}

function circle(path: Path2D, center: coordinates2D) {
	path.arc(center.x, center.y, graphics.node.radius, 0, 2 * Math.PI)
}
export function getContextFromRef(
	canvasRef: React.MutableRefObject<null | HTMLCanvasElement>,
) {
	let canvas = canvasRef.current
	if (!canvas) throw new Error('Canvas not defined. Check canvasRef.')
	let ctx = canvas.getContext('2d')
	if (!ctx) throw new Error('Context not defined. Check canvasRef.')
	return ctx
}
export function clearContext(ctx: CanvasRenderingContext2D) {
	const { width, height } = extractContextDims(ctx)
	ctx.clearRect(0, 0, width, height)
}
export function transformContext(
	ctx: CanvasRenderingContext2D,
	transformation: { dx: number; dy: number; scale: number },
) {
	const { dx, dy, scale } = transformation
	ctx.setTransform(scale, 0, 0, scale, dx, dy)
}
