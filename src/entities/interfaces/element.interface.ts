import { IMatrix } from './matrix.interface'
import { IJoint, ISupport } from './nodes.interface'
import { coordinateSystem } from './s-matrix.interface'
import { ISection } from './section.interface'

export interface IElement {
	readonly nodes: { initial: IJoint | ISupport; final: IJoint | ISupport }
	readonly length: number
	readonly inclination: number
	young: number
	section: ISection
	stiffness(system: coordinateSystem): IMatrix
}
