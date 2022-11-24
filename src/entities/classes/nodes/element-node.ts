import {
	coordinates2D,
	degsOfFreedom2D,
	degsOfFreedom2DBoolean,
	nodeDisplacements2DObject,
	nodeLoads2D,
	nodeLoads2DObject,
} from '@types'
import { INode } from '@interfaces'
import {
	defaultNodeConstraints,
	defaultNodeDeformations,
	defaultNodeLoads,
} from '@config'

export class ElementNode implements INode {
	private _loads: nodeLoads2DObject
	private _displacements: nodeDisplacements2DObject
	private _coordinates: coordinates2D
	public constraints: degsOfFreedom2DBoolean

	constructor(coordinates: coordinates2D) {
		this.constraints = { ...defaultNodeConstraints }
		this._coordinates = { ...coordinates }
		this._loads = { ...defaultNodeLoads }
		this._displacements = { ...defaultNodeDeformations }
	}
	get loads(): nodeLoads2DObject {
		return this._loads
	}
	get displacements(): nodeDisplacements2DObject {
		return this._displacements
	}
	private get displacedCoordinates(): coordinates2D {
		return {
			x: this._coordinates.x + this._displacements.dx,
			y: this._coordinates.y + this._displacements.dy,
		}
	}
	coordinates(state: 'static' | 'displaced'): coordinates2D {
		return state == 'static' ? this._coordinates : this.displacedCoordinates
	}
	setLoads(loads: Partial<nodeLoads2DObject>): void {
		this._loads = { ...this._loads, ...loads }
	}
	addLoads(loads: Partial<nodeLoads2DObject>): void {
		let keys = Object.keys(loads) as nodeLoads2D[]
		keys.forEach((key) => {
			this._loads[key] += loads[key]!
		})
	}
	setDisplacements(displacements: Partial<nodeDisplacements2DObject>): void {
		this._displacements = { ...this._displacements, ...displacements }
	}
	addDisplacements(displacements: Partial<nodeDisplacements2DObject>): void {
		let keys = Object.keys(displacements) as degsOfFreedom2D[]
		keys.forEach((key) => {
			this._displacements[key] += displacements[key]!
		})
	}
	reset(): void {
		this._displacements = { ...defaultNodeDeformations }
	}
}
