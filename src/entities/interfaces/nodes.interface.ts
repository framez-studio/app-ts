import {
	coordinates2D,
	degsOfFreedom2DBoolean,
	nodeDisplacements2DObject,
	nodeLoads2DObject,
} from '@types'
import { Resetable } from '@interfaces'

export interface INode extends Resetable {
	readonly loads: nodeLoads2DObject
	readonly displacements: nodeDisplacements2DObject
	constraints: degsOfFreedom2DBoolean
	coordinates(state: 'static' | 'displaced'): coordinates2D
	setLoads(loads: Partial<nodeLoads2DObject>): void
	addLoads(loads: Partial<nodeLoads2DObject>): void
	setDisplacements(displacements: Partial<nodeDisplacements2DObject>): void
	addDisplacements(displacements: Partial<nodeDisplacements2DObject>): void
	
}
