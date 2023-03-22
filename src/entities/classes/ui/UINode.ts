import { graphics } from '@config/app-canvas'
import { INode, IUINode } from '@interfaces'
import { fillPath, outlinePath } from '@utils/app-canvas'
import { nodePath } from '@utils/app-canvas-paths'

export class UINode implements IUINode {
	// Posibility: Add a set status method to change from static to displaced and viceversa
	private _selected: boolean = false
	private _hovered: boolean = false
	private _object: INode
	private _ctx: CanvasRenderingContext2D

	constructor(node: INode, ctx: CanvasRenderingContext2D) {
		this._object = node
		this._ctx = ctx
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
		return nodePath(this.object, this._ctx, 'static')
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
		const { isHovered, isSelected, _ctx: ctx, path } = this
		const { fill, outline } = graphics.element

		fillPath(path, ctx, fill)

		if (isSelected)
			outlinePath(path, ctx, {
				width: outline.width,
				color: outline.selected,
			})
		else if (isHovered)
			outlinePath(path, ctx, {
				width: outline.width,
				color: outline.hovered,
			})
	}
}
