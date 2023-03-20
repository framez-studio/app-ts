import { graphics } from '@config/app-canvas'
import { INode, IUINode } from '@interfaces'
import { nodePath } from '@utils/app-canvas-paths'

export class UINode implements IUINode {
	// Posibility: Add a set status method to change from static to displaced and viceversa
	private _path = new Path2D()
	private _selected: boolean = false
	private _hovered: boolean = false
	private _object: INode
	private _ctx: CanvasRenderingContext2D

	constructor(node: INode, ctx: CanvasRenderingContext2D) {
		this._object = node
		this._ctx = ctx
		this._path = nodePath(node, ctx, 'static')
	}
	get isSelected() {
		return this._selected
	}
	get isHovered() {
		return this._hovered
	}
	get object(): INode {
		return this._object
	}
	get path(): Path2D {
		return this._path
	}
	select(): void {
		this._selected = true
	}
	unselect(): void {
		this._selected = false
	}
	hover(): void {
		this._hovered = true
	}
	unhover(): void {
		this._hovered = false
	}
	printOnContext(): void {
		let { isHovered, isSelected, _ctx: ctx } = this

		ctx.fillStyle = graphics.node.fill
		ctx.fill(this.path)

		if (isSelected) {
			ctx.strokeStyle = graphics.node.outline.selected
			ctx.lineWidth = graphics.node.outline.width
			ctx.stroke(this.path)
		} else if (isHovered) {
			ctx.strokeStyle = graphics.node.outline.hovered
			ctx.lineWidth = graphics.node.outline.width
			ctx.stroke(this.path)
		}
	}
}
