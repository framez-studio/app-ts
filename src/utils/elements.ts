import { coordinates2D } from '../entities/types'
import { IElement } from '../entities/interfaces/element.interface'
import { IMatrixOperator } from '../entities/interfaces/matrix-operator.interface'
import { INode } from '../entities/interfaces/nodes.interface'
import { MatrixOperator } from '../entities/classes/matrices/matrix-operator'

const MatOp: IMatrixOperator = new MatrixOperator()

export const uniques = <T>(...elements: T[]): T[] => {
	let uniqueElements = new Set()
	elements.forEach((element) => uniqueElements.add(element))
	return Array.from(uniqueElements) as T[]
}
export const filterNodeByCoords = (
	nodes: INode[],
	x: number,
	y: number,
): INode => {
	let node = nodes.filter((inode) => {
		return inode.coordinates.x === x && inode.coordinates.y === y
	})
	if (!node[0])
		throw new Error(`Didn't find Node with coordinates [${x},${y}]`)
	return node[0]
}
export const filterElementByCoords = (
	elements: IElement[],
	initial: coordinates2D,
	final: coordinates2D,
) => {
	let element = elements.filter((ielement) => {
		return (
			ielement.nodes.initial.coordinates.x === initial.x &&
			ielement.nodes.initial.coordinates.y === initial.y &&
			ielement.nodes.final.coordinates.x === final.x &&
			ielement.nodes.final.coordinates.y === final.y
		)
	})
	if (!element[0])
		throw new Error(
			`Didn't find Element with coordinates [${initial.x},${initial.y}], [${final.x},${final.y}]`,
		)
	return element[0]
}
export const assemblyMatrix = (nodes: INode[], elements: IElement[]) => {
	let degs = nodes.length
	return
}
