import { coordinates2D } from '@types'

export function roundedRectPath(
	center: coordinates2D,
	dims: { width: number; height: number; radius: number },
) {
	const path = new Path2D()
	let x = center.x - dims.width / 2
	let y = center.y - dims.height / 2
	let { height, radius, width } = dims
	path.moveTo(x, y + radius)
	path.arcTo(x, y + height, x + radius, y + height, radius)
	path.arcTo(x + width, y + height, x + width, y + height - radius, radius)
	path.arcTo(x + width, y, x + width - radius, y, radius)
	path.arcTo(x, y, x, y + radius, radius)
	return path
}

export function circlePath(center: coordinates2D, radius: number) {
	const path = new Path2D()
	path.arc(center.x, center.y, radius, 0, 2 * Math.PI)
	return path
}
/**
 * Creates a path for an arrow pointing downwards
 * @param point - coordinates of the arrow's tip
 * @param length - length of the arrow
 * @returns - path for the arrow
 */
export function arrowPath(
	point: coordinates2D,
	length: number,
	lineWidth = length * 0.05,
) {
	const path = new Path2D()
	const { x, y } = point
	const line = { height: length - 5 * lineWidth, width: lineWidth }
	const tip = { height: 5 * lineWidth, width: 5 * lineWidth }
	path.moveTo(x, y)
	path.lineTo(x - tip.width / 2, y - tip.height)
	path.lineTo(x - line.width / 2, y - tip.height)

	path.lineTo(x - line.width / 2, y - length)
	path.lineTo(x + line.width / 2, y - length)
	path.lineTo(x + line.width / 2, y - tip.height)

	path.lineTo(x + tip.width / 2, y - tip.height)
	path.closePath()
	return path
}
/**
 * Line path with custom width
 * @param initial  - initial point
 * @param final - final point
 * @param width - width of the line
 * @returns - path for the line
 */
export function linePath(
	initial: coordinates2D,
	final: coordinates2D,
	width: number,
) {
	const path = new Path2D()
	const angle =
		Math.PI / 2 - Math.atan2(final.y - initial.y, final.x - initial.x)
	const delta = {
		x: (width / 2) * Math.cos(angle),
		y: (width / 2) * Math.sin(angle),
	}
	const vertices = [
		{
			x: initial.x - delta.x,
			y: initial.y + delta.y,
		},
		{
			x: initial.x + delta.x,
			y: initial.y - delta.y,
		},
		{
			x: final.x + delta.x,
			y: final.y - delta.y,
		},
		{
			x: final.x - delta.x,
			y: final.y + delta.y,
		},
	]
	vertices.forEach((vertex, indx) => {
		if (indx == 0) path.moveTo(vertex.x, vertex.y)
		else path.lineTo(vertex.x, vertex.y)
	})
	path.closePath()
	return path
}
/**
 * Creates a path for a downward triangle
 * @param point - coordinates of the tip of the triangle
 * @param base - base of the triangle
 * @param height - height of the triangle
 * @returns - Path2D object of the triangle
 */
export function downwardTrianglePath(
	point: coordinates2D,
	base: number,
	height: number,
) {
	const path = new Path2D()
	const { x, y } = point
	path.moveTo(x, y)
	path.lineTo(x - base / 2, y - height)
	path.lineTo(x + base / 2, y - height)
	path.closePath()
	return path
}
