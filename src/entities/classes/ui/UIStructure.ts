import { IStructure } from '@/entities/interfaces'
import { IUIElement, IUINode, IUIStructure } from '@interfaces'
import { coordinates2D } from '@types'
import { IUILayer, IUILayerType, IUISelection } from '@types-ui'
import { generateGraphicStructure, printStructure } from '@/utils'
import {
	IUICoordMatch,
	checkCoordsMatchTroughLayers,
} from '@/utils/ui-structure'

export class UIStructure implements IUIStructure {
	private _structure: IStructure
	private _selected: IUISelection = { layer: null, index: null }
	private _hovered: IUISelection = { layer: null, index: null }
	private _context: CanvasRenderingContext2D | null = null
	private _nodes: IUINode[] = []
	private _elements: IUIElement[] = []
	private _hasChanged = true

	constructor(structure: IStructure) {
		this._structure = structure
	}
	private get layers(): IUILayer[] {
		return [
			{ name: 'nodes', elements: this._nodes },
			{ name: 'elements', elements: this._elements },
		]
	}
	get structure() {
		return this._structure
	}
	get selected() {
		return this._selected
	}
	get hovered() {
		return this._hovered
	}
	setContext(ctx: CanvasRenderingContext2D): void {
		this._context = ctx
	}
	printOnContext(): void {
		const { _hasChanged: hasChanged } = this
		if (hasChanged) this.generatePaths()
		const ctx = this.getContext()
		const { _nodes, _elements } = this
		printStructure({ context: ctx, nodes: _nodes, elements: _elements })
	}
	getGraphicElement(layerName: string, index: number): IUINode | IUIElement {
		let layer = this.getLayer(layerName)
		return layer.elements[index]
	}
	pointerUpHandler(e: React.PointerEvent): void {
		const { clientX: x, clientY: y } = e
		const { _selected: selected } = this
		const { layer, index } = this.findCoordsMatch({ x, y })

		if (layer === null || index === null) return
		const isTheSameAsSelected =
			selected.layer == layer && selected.index == index

		if (isTheSameAsSelected) this.releaseCurrentSelection()
		else this.select(layer, index)
	}
	pointerMoveHandler(e: React.PointerEvent): void {}
	private generatePaths(status: 'static' | 'displaced' = 'static'): void {
		const { structure, _hasChanged: hasChanged } = this
		if (!hasChanged) return
		const ctx = this.getContext()
		const { nodes, elements } = generateGraphicStructure(ctx, structure)
		this._nodes = [...nodes]
		this._elements = [...elements]
		this._hasChanged = false
	}
	private getLayer(name: string): IUILayer {
		let layerIndex = this.layers.findIndex((layer) => layer.name == name)
		if (layerIndex == -1)
			throw new Error(`Didn't find a layer with name: ${name}`)
		return this.layers[layerIndex]
	}
	private getContext(): CanvasRenderingContext2D {
		if (!this._context)
			throw new Error(
				`There's no context. Please use setContext method first.`,
			)
		return this._context
	}
	private findCoordsMatch(coords: coordinates2D): IUICoordMatch {
		const ctx = this.getContext()
		const match = checkCoordsMatchTroughLayers(ctx, this.layers, coords)
		return match
	}
	private select(layer: IUILayerType, index: number) {
		this.releaseCurrentSelection()
		this.getGraphicElement(layer, index).select()
		this._selected = { layer, index }
	}
	private releaseCurrentSelection() {
		const { layer, index } = this._selected
		if (layer == null || index == null) return
		this.getGraphicElement(layer, index).unselect()
		this._selected = { layer: null, index: null }
	}
}
