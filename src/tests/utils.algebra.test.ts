import { eucDistance, degSlope } from '@utils/algebra'
import { describe, expect, it } from 'vitest'

describe('Algebra utils', () => {
	it('should calculate the euclidean distance between two points', () => {
		let distance = eucDistance({ x: 0, y: 0 }, { x: 3, y: 4 })
		expect(distance).toBe(5)
	})
	it('should calculate the angle between two points', () => {
		let angle = degSlope({ x: 0, y: 0 }, { x: 2, y: 2 })
		expect(angle).toBe(45)
	})
})
