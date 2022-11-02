import {
	Array2D,
	coordinates2D,
	stiffnessSubmatrices2D,
} from '../entities/types'
import { IElement } from '../entities/interfaces/element.interface'
import { IStiffnessMatrixOperator } from '../entities/interfaces/matrix-operator.interface'
import { INode } from '../entities/interfaces/nodes.interface'
import { SMatrixOperator } from '../entities/classes/matrices/s-matrix-operator'

const matOp: IStiffnessMatrixOperator = new SMatrixOperator()

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
	let degs = nodes.length * 3
	let matrix = matOp.zeros([degs, degs])
	elements.forEach((element) => {
		if (
			nodes.includes(element.nodes.initial) &&
			nodes.includes(element.nodes.final)
		) {
			let iDegIndex = nodes.indexOf(element.nodes.initial)
			let fDegIndex = nodes.indexOf(element.nodes.final)
			let iDegRange = [iDegIndex * 3, iDegIndex * 3 + 2] as [
				number,
				number,
			]
			let fDegRange = [fDegIndex * 3, fDegIndex * 3 + 2] as [
				number,
				number,
			]
			let ranges = {
				ii: {
					rows: iDegRange,
					columns: iDegRange,
				},
				ij: {
					rows: iDegRange,
					columns: fDegRange,
				},
				ji: {
					rows: fDegRange,
					columns: iDegRange,
				},
				jj: {
					rows: fDegRange,
					columns: fDegRange,
				},
			}
			let stiffness = matOp.submatrices(element.stiffness('global'))
			let indexes = Object.keys(stiffness) as stiffnessSubmatrices2D[]

			indexes.forEach((index) => {
				let oldSubmatrix = matOp.subset(
					matrix,
					ranges[index].rows,
					ranges[index].columns,
				) as Array2D
				let newSubmatrix = stiffness[index]
				let updatedSubmatrix = matOp.sum(
					oldSubmatrix,
					newSubmatrix,
				) as Array2D

				matrix = matOp.replace(
					matrix,
					ranges[index].rows,
					ranges[index].columns,
					updatedSubmatrix,
				) as Array2D
			})
		}
	})
	return matrix
}
