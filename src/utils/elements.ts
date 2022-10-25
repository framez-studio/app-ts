import { MatrixOperator } from '../entities/classes/matrices/matrix-operator'
import { IElement } from '../entities/interfaces/element.interface'
import { INode } from '../entities/interfaces/nodes.interface'

const MatOp = new MatrixOperator()

export const uniques = <T>(...elements: T[]): T[] => {
	let uniqueElements = new Set()
	elements.forEach((element) => uniqueElements.add(element))
	return Array.from(uniqueElements) as T[]
}

export const assemblyMatrix = (nodes: INode[], elements: IElement[]) => {
	let degs = nodes.length
	return
}
