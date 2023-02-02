import {
	coordinates2D,
	degsOfFreedom2D,
	degsOfFreedom2DBoolean,
	nodeDisplacements2DObject,
	nodeLoads2D,
	nodeLoads2DObject,
} from '@types'
import { IElement, INode } from '@interfaces'
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
	public _elements: IElement[] | undefined

	constructor(coordinates: coordinates2D) {
		this.constraints = { ...defaultNodeConstraints }
		this._coordinates = { ...coordinates }
		this._loads = { ...defaultNodeLoads }
		this._displacements = { ...defaultNodeDeformations }
	}
	get nodeMass(){
		let m: number = 0
		if (this._elements!= undefined) {
			this._elements.forEach(e => {
				m = m +  e.mass * 0.5
			});
		}
		return m
	}

	get loads(): nodeLoads2DObject {
		return this._loads
	}

	get displacements(): nodeDisplacements2DObject {
		return this._displacements
	}
	
	get elements(){
		return this._elements
	}

	private get displacedCoordinates(): coordinates2D {
		return {
			x: this._coordinates.x + this._displacements.dx,
			y: this._coordinates.y + this._displacements.dy,
		}
	}

	connectElement(element: IElement): void {
		if(this._elements == undefined){
			this._elements = [element]
		}else{
			this._elements.push(element)
		}
	}

	removeElement(element: IElement): void {
		try {
			this._elements = this._elements?.filter(e => e != element)
		} catch (error) {
			
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

	isSupport(): boolean {
		if (this.constraints.dx == false &&
			this.constraints.dy == false &&
			this.constraints.rz == false) {
			return false
		} else {
			return true
		}
	}

	reset(): void {
		this._displacements = { ...defaultNodeDeformations }
	}
}
