import { describe, expect, it } from 'vitest'

describe.todo('Solver utils', () => {
	// TODO:
	it('should calculate matrix displacements', () => {
		let kred = new Matrix([
			[20517, -6652, 619],
			[-6652, 9003, -610],
			[619, -610, 34370],
		])
		let p = new Matrix([0, 0, 75])
		let fef = [0, 30, -150]
		let displacements = solverDisplacements(kred, fef, p)
		expect(displacements).toBe(new Matrix([-0.001491, -0.003993, 0.006502]))
	})
})
