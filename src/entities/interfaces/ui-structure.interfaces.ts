import { IUISelection, IUIStructureObject } from '@types-ui'
import { IElement, INode, IStructure } from '@interfaces'

export interface IUIPrintable {
	printOnContext(): void
}
export interface IUISelectable {
	readonly isSelected: boolean
	select(): void
	unselect(): void
}
export interface IUIHoverable {
	readonly isHovered: boolean
	hover(): void
	unhover(): void
}
export interface IUIStructure extends IUIPrintable {
	readonly structure: IStructure
	readonly selected: IUISelection
	readonly hovered: IUISelection
	setContext(ctx: CanvasRenderingContext2D): void
	getGraphicElement(layerName: string, index: number): IUINode | IUIElement
	pointerUpHandler(e: React.PointerEvent): void
	pointerMoveHandler(e: React.PointerEvent): void
}
export interface IUINode
	extends IUIStructureObject<INode>,
		IUISelectable,
		IUIHoverable,
		IUIPrintable {}
export interface IUIElement
	extends IUIStructureObject<IElement>,
		IUISelectable,
		IUIHoverable,
		IUIPrintable {}
export interface IUIOutline {
	readonly width: number
	readonly color: string
}
