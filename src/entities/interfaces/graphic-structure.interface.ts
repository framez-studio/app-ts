import { IUISelection } from '@types-ui'
import { IUIElement, IUINode } from './ui.interfaces'

export interface IGraphicStructure {
	printOnContext(ctx: CanvasRenderingContext2D): void
	pointerUpHandler(e: React.PointerEvent): void
	pointerMoveHandler(e: React.PointerEvent): void
	getSelected(): IUISelection
	getGraphicElement(layer: string, index: number): IUINode | IUIElement
}
