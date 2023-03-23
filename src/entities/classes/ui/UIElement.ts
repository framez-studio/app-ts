import { IElement, IUIElement } from '@interfaces'
import { graphics } from '@config/app-canvas'
import { elementPath, elementLoadPath } from '@utils/app-canvas-paths'

export class UIElement implements IUIElement {
	// Posibility: Add a set status method to change from static to displaced and viceversa
	private _path = new Path2D()
	private _selected: boolean = false
	private _hovered: boolean = false
	private _object: IElement
	private _ctx: CanvasRenderingContext2D

	constructor(element: IElement, ctx: CanvasRenderingContext2D) {
		this._object = element
		this._ctx = ctx
		this._path = elementPath(element, ctx, 'static')
	}
	get isSelected() {
		return this._selected
	}
	get isHovered() {
		return this._hovered
	}
	get object(): IElement {
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

		ctx.fillStyle = graphics.element.fill
		ctx.fill(this.path)

		const { load } = this.object.loads[0]
		if (load) this.printLoadOnContext()

		if (isSelected) {
			ctx.strokeStyle = graphics.element.outline.selected
			ctx.lineWidth = graphics.element.outline.width
			ctx.stroke(this.path)
		} else if (isHovered) {
			ctx.strokeStyle = graphics.element.outline.hovered
			ctx.lineWidth = graphics.element.outline.width
			ctx.stroke(this.path)
		}
	}
	private printLoadOnContext(): void {
		let { _ctx: ctx } = this
		let loadPath = elementLoadPath(this.object, ctx, 'static')
		ctx.fillStyle = graphics.loads.fill
		ctx.fill(loadPath)
	}
}
