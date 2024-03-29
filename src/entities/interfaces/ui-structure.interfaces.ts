import { IUISelection, IUIStructureObject } from '@types-ui'
import {
	IElement,
	IFrameSystem,
	INode,
	ISteelNumRowsState,
	IStructure,
} from '@interfaces'

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
	setStructure(structure: IStructure): void
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
export interface IGeneratorElementConfig {
	material: {
		young: number
		weight: number
		fc: number
		epsilon_max: number
	}
	section: { base: number; height: number }
	steel: {
		fy: number
		young: number
		rows: ISteelNumRowsState[]
	}
	load: number
	momentCurvature: {
		automatic: boolean
		moment?: {
			min: number
			max: number
		}
		curvature?: {
			min: number
			max: number
		}
	}
}
export interface IGeneratorConfig {
	levels: number[]
	spans: number[]
	columns: IGeneratorElementConfig
	beams: IGeneratorElementConfig
}
export interface IGeneratorOutput {
	structure: IFrameSystem
	columns: IElement[]
	beams: IElement[]
	spans?: IFramezStep[]
	levels?: IFramezStep[]
}
export interface IFramezStep {
	index: number
	separation: number
	elements: IElement[]
}
