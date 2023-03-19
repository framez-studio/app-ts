import { IAppCanvasCamera } from '@types-ui'

/**
 * Handle the extraction process of a canvas context from a react ref.
 * @param {(React.MutableRefObject<null | HTMLCanvasElement>)} canvasRef
 * @return - The canvas context.
 */
export function getContextFromRef(
	canvasRef: React.MutableRefObject<null | HTMLCanvasElement>,
) {
	let canvas = canvasRef.current
	if (!canvas) throw new Error('Canvas not defined. Check canvasRef.')
	let ctx = canvas.getContext('2d')
	if (!ctx) throw new Error('Context not defined. Check canvasRef.')
	return ctx
}
/**
 * Extract the width and height dimensions of a the canvas associated to a context.
 * @param ctx - The context to extract the dimensions from.
 * @returns - The width and height of the canvas associated to the context in an object.
 */
export function extractContextDims(ctx: CanvasRenderingContext2D) {
	let canvas = ctx.canvas
	return { width: canvas.width, height: canvas.height }
}
/**
 * Clear the whole context area.
 * @param ctx - The context to clear.
 */
export function clearContext(ctx: CanvasRenderingContext2D) {
	ctx.save()
	ctx.setTransform(1, 0, 0, 1, 0, 0)
	const { width, height } = extractContextDims(ctx)
	ctx.clearRect(0, 0, width, height)
	ctx.restore()
}
/**
 * Transform the context to a new coordinate system.
 * @param ctx - The context to transform.
 * @param transformation  - The transformation to apply to the context. It is an object with the following properties: dx, dy, scale (dx and dy are the translation factors in the x and y axis respectively and scale is the scale factor). The transformation is applied to the context in the following way: ctx.setTransform(scale, 0, 0, scale, dx, dy). The traslation is made in the current scale of the context before the transformation.
 */
export function transformContext(
	ctx: CanvasRenderingContext2D,
	transformation: { dx: number; dy: number; scale: number },
) {
	const { dx, dy, scale } = transformation
	ctx.setTransform(scale, 0, 0, scale, dx, dy)
}
