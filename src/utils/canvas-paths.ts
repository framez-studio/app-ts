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
