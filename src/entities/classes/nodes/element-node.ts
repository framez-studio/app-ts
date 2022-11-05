import {
	coordinates2D,
	degsOfFreedom2DBoolean,
	nodeLoads2D,
	nodeLoads2DObject,
} from '@types'
import { INode, Printable } from '@interfaces'
import { defaultNodeConstraints, defaultNodeLoads } from '@config'

export class ElementNode implements INode, Printable {
	private _loads: nodeLoads2DObject
	public coordinates: coordinates2D
	public constraints: degsOfFreedom2DBoolean

	constructor(x: number, y: number) {
		this.coordinates = { x, y }
		this.constraints = defaultNodeConstraints
		this._loads = defaultNodeLoads
	}
	get loads(): nodeLoads2DObject {
		return this._loads
	}
	setLoad(load: nodeLoads2D, value: number): void {
		this._loads[load] = value
	}
	addLoad(load: nodeLoads2D, value: number): void {
		this._loads[load] += value
	}
	printOnCanvas(context: CanvasRenderingContext2D): void {
		throw new Error('Method not implemented.')
	}
}
