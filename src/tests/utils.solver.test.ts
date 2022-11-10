import { solveLinearSystem } from '@utils'
import { describe, expect, it } from 'vitest'

describe('Solver utils', () => {
	it('should calculate the solution of a linear system', () => {
		let a = [
			[1, 1],
			[1, -1],
		]
		let b = [[45], [21]]
		let expected = [[33], [12]]
		let result = solveLinearSystem(a, b)
		expect(result).toEqual(expected)
	})
})
