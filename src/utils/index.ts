export {
	assemblyMatrix,
	assemblyFef,
	filterElementByCoords,
	filterNodeByCoords,
	getStructureDisplacements,
} from '@utils/elements'
export { eucDistance, degSlope, algebra } from '@utils/algebra'
export {
	rectangularLoadFef,
	punctualLoadFef,
	reactions2DObject,
} from '@utils/fefs'
export { allIndexesOf, uniques } from '@utils/helpers'
export { stiffness, transformation } from '@utils/matrices'
export { solveLinearSystem } from '@utils/solver'
