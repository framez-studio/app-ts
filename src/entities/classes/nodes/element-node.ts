import { INode } from '../../interfaces/nodes.interface'
import { Printable } from '../../interfaces/ui.interfaces'
import {
	coordinates2D,
	degsOfFreedom2DBoolean,
	nodeLoads2D,
	nodeLoads2DObject,
} from '../../types'

export class ElementNode implements INode, Printable {
	private _loads: nodeLoads2DObject
	public coordinates: coordinates2D
	public constraints: degsOfFreedom2DBoolean

	constructor(x: number, y: number) {
		this.coordinates = { x, y }
		this.constraints = { dx: false, dy: false, rz: false }
		this._loads = { fx: 0, fy: 0, mz: 0 }
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
