import {
	Array2D,
	coordinates2D,
	degsOfFreedom2DArray,
	elementDegsOfFreedom2DObject,
	elementLoads2DArray,
	elementLoads2DObject,
	stiffnessSubmatrices2D,
	supportType,
} from '@types'
import { constraints } from '@config/globals'
import { IElement, IFrameSystem, INode, IStructure } from '@interfaces'
import { SMatrixOperator as SMatOp } from '@classes/matrices/s-matrix-operator'
import { solveLinearSystem } from '@utils/solver'
import { allIndexesOf } from './helpers'
import { FHE } from '@classes/seismic-analysis/fhe'
import {
	PushoverSolver,
	normalizeLoads2Unit,
} from '@classes/solvers/pushover-solver'

export const releasesArray = (
	releases: elementDegsOfFreedom2DObject,
): degsOfFreedom2DArray => {
	return [
		releases.initial.dx,
		releases.initial.dy,
		releases.initial.rz,
		releases.final.dx,
		releases.final.dy,
		releases.final.rz,
	]
}

export const filterNodeByCoords = (
	nodes: INode[],
	x: number,
	y: number,
): INode => {
	let node = nodes.filter((inode) => {
		return (
			inode.coordinates('static').x === x &&
			inode.coordinates('static').y === y
		)
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
			ielement.nodes.initial.coordinates('static').x === initial.x &&
			ielement.nodes.initial.coordinates('static').y === initial.y &&
			ielement.nodes.final.coordinates('static').x === final.x &&
			ielement.nodes.final.coordinates('static').y === final.y
		)
	})
	if (!element[0])
		throw new Error(
			`Didn't find Element with coordinates [${initial.x},${initial.y}], [${final.x},${final.y}]`,
		)
	return element[0]
}
export const assemblyMatrix = (
	nodes: INode[],
	elements: IElement[],
): Array2D => {
	let nDegs = nodes.length * 3
	let matrix = SMatOp.zeros([nDegs, nDegs])
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
			let stiffness = SMatOp.submatrices(element.stiffness('global'))
			let indexes = Object.keys(stiffness) as stiffnessSubmatrices2D[]

			indexes.forEach((index) => {
				let oldSubmatrix = SMatOp.subset(
					matrix,
					ranges[index].rows,
					ranges[index].columns,
				) as Array2D
				let newSubmatrix = stiffness[index]
				let updatedSubmatrix = SMatOp.sum(
					oldSubmatrix,
					newSubmatrix,
				) as Array2D

				matrix = SMatOp.replace(
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
export const assemblyFef = (nodes: INode[], elements: IElement[]): Array2D => {
	let nDegs = nodes.length * 3
	let fef = SMatOp.zeros([nDegs, 1])
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
			let fefs = element.fef('global')
			let degs = {
				i: {
					range: iDegRange,
					fef: [fefs[0], fefs[1], fefs[2]],
				},
				f: {
					range: fDegRange,
					fef: [fefs[3], fefs[4], fefs[5]],
				},
			}
			Object.values(degs).forEach((deg) => {
				let oldFef = SMatOp.subset(fef, deg.range, 0) as Array2D
				let newFef = SMatOp.sum(deg.fef, oldFef) as Array2D
				fef = SMatOp.replace(fef, deg.range, 0, newFef) as Array2D
			})
		}
	})
	return fef
}

export const getStructureDisplacements = (
	stiffness: Array2D,
	fef: Array2D,
	loads: Array2D,
	constraints: boolean[],
): Array2D => {
	let lockedDegs = allIndexesOf(constraints, true)
	let unlockedDegs = allIndexesOf(constraints, false)
	let reducedStiffness = SMatOp.reduceDegs('matrix', stiffness, ...lockedDegs)
	let reducedExternalLoads = SMatOp.reduceDegs('vector', loads, ...lockedDegs)
	let reducedFefs = SMatOp.reduceDegs('vector', fef, ...lockedDegs)
	let nodeLoads = SMatOp.subtract(
		reducedExternalLoads,
		reducedFefs,
	) as Array2D
	let unknownDisplacements = solveLinearSystem(reducedStiffness, nodeLoads)
	let displacements = SMatOp.zeros([constraints.length, 1])
	let displacementIndex = 0
	unlockedDegs.forEach((degIndex) => {
		displacements[degIndex] = unknownDisplacements[displacementIndex++]
	})
	return displacements
}

export const displaceStructure = (structure: IStructure): Array2D => {
	let displacementsArr = getStructureDisplacements(
		structure.stiffness('full'),
		structure.fef('full'),
		structure.nodeLoads,
		structure.constraints,
	)
	structure.nodes.forEach((node, i) => {
		let displacements = {
			dx: displacementsArr[i * 3][0],
			dy: displacementsArr[i * 3 + 1][0],
			rz: displacementsArr[i * 3 + 2][0],
		}
		node.setDisplacements(displacements)
	})
	return displacementsArr
}
export const setStructureReactions = (structure: IStructure): void => {
	const reactions = SMatOp.multiply(
		structure.stiffness('full'),
		structure.displacements,
	) as Array2D
	structure.nodes.forEach((node, i) => {
		let reaction = {
			fx: reactions[i * 3][0],
			fy: reactions[i * 3 + 1][0],
			mz: reactions[i * 3 + 2][0],
		}
		node.setReactions(reaction)
	})
}
export const elementLocalDisplacementsArray = (element: IElement): Array2D => {
	let angle = -element.inclination
	let globalDisplacements = [
		[element.nodes.initial.displacements.dx],
		[element.nodes.initial.displacements.dy],
		[element.nodes.initial.displacements.rz],
		[element.nodes.final.displacements.dx],
		[element.nodes.final.displacements.dy],
		[element.nodes.final.displacements.rz],
	]
	return SMatOp.rotateVector(globalDisplacements, angle)
}

export const nodeType = (node: INode): supportType | 'node' => {
	let type: supportType | 'node' = 'node'
	const ref = { ...constraints }
	const values = node.constraints
	const keys = Object.keys(ref) as supportType[]
	keys.forEach((key) => {
		if (
			ref[key].dx == values.dx &&
			ref[key].dy == values.dx &&
			ref[key].rz == values.rz
		) {
			type = key
		}
	})
	return type
}
export function forcesArrayToObject(
	arr: elementLoads2DArray,
): elementLoads2DObject {
	return {
		initial: { fx: arr[0][0], fy: arr[1][0], mz: arr[2][0] },
		final: { fx: arr[3][0], fy: arr[4][0], mz: arr[5][0] },
	}
}

/**
 * Checks if an element has a single load object with a non-zero load inside its loads array. If the element has more than one load object, an error is thrown. If the element has no load object, an error is thrown.
 * @param element - Element to check
 * @returns
 */
export function hasNonZeroLoad(element: IElement): boolean {
	let hasLoad = false
	if (element.loads.length == 0)
		throw new Error('Element has no load objects')
	if (element.loads.length > 1)
		throw new Error('Element has more than one load object')
	if (element.loads[0].load) hasLoad = true
	return hasLoad
}

export function getCapacityCurve(config: {
	structure: IFrameSystem
	direction: 'left' | 'right'
	node: { x: number; y: number }
	constants: { av: number; fv: number }
}) {
	const { direction, node, constants, structure } = config
	const { av, fv } = constants

	const structurePivot = structure.copy()
	normalizeLoads2Unit(structurePivot, 100)

	PushoverSolver.Run(structurePivot, node, 'service', 100)
	structurePivot.resetLoadstoZero()

	FHE.setFHEinNodes(structurePivot, direction == 'left' ? -1 : 1, 2, av, fv)
	PushoverSolver.Run(structurePivot, node, 'stability')

	return PushoverSolver.capacityCurve()
}
