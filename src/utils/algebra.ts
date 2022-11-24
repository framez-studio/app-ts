import { coordinates2D } from '@types'
import { create, all } from 'mathjs'

const config = {}
/**
 * Algebra object contains all the mathematic functions needed to manipulate Arrays as matrices.
 * TODO: find a way to optimize the config object to require only the Matrix Manipulation functions.
 */
export const algebra = create(all, config)

/**
 * Calculates the Euclidean Distance between two points in a 2D coordinate system
 * @param iPoint - Initial Point coordinates
 * @param fPoint - Final Point coordinates
 * @returns
 */
export const eucDistance = (
	iPoint: coordinates2D,
	fPoint: coordinates2D,
): number => {
	return algebra.distance(
		[iPoint.x, iPoint.y],
		[fPoint.x, fPoint.y],
	) as number
}

/**
 * Calculates the slope in degrees between two points in a 2D coordinate syestem
 * @param iPoint - Initial Point coordinates
 * @param fPoint - Final Point coordinates
 * @returns
 */
export const degSlope = (
	iPoint: coordinates2D,
	fPoint: coordinates2D,
): number => {
	let dy = fPoint.y - iPoint.y
	let dx = fPoint.x - iPoint.x
	let slope = Math.atan(dy / dx)
	let degs = (slope * 180) / Math.PI
	return degs
}

export const absolutevalue = (a: number) => {
	return a > 0 ? a : a * -1
}

export const pi: number = algebra.pi
