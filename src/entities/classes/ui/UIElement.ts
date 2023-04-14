import { IElement, IUIElement } from '@interfaces'
import { graphics } from '@config/app-canvas'
import { elementPath } from '@utils/app-canvas-paths'
import {
	fillPath,
	outlinePath,
	printElementHinges,
	printElementLoad,
} from '@utils/app-canvas'
import { assignLoadIfAbsent, hasNonZeroLoad } from '@utils/elements'

export class UIElement implements IUIElement {
	// Posibility: Add a set status method to change from static to displaced and viceversa
	private _selected: boolean = false
	private _hovered: boolean = false
	private _object: IElement
	private _ctx: CanvasRenderingContext2D

	constructor(element: IElement, ctx: CanvasRenderingContext2D) {
		this._object = element
		this._ctx = ctx
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
		return elementPath(this.object, this._ctx, 'static')
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
		const { isHovered, isSelected, _ctx: ctx, path, object } = this
		const { fill, outline } = graphics.element

		fillPath(path, ctx, fill)

		assignLoadIfAbsent(object)
		if (hasNonZeroLoad(object)) printElementLoad(object, ctx, 'static')

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
		printElementHinges(object, ctx, 'static')
	}
}
