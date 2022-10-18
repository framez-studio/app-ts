import { describe, expect, it } from 'vitest'
import { RectangularHSection } from '../entities/classes/sections/rectangular-h-section'

describe('Rectangular Hollow Section', () => {
	const section = new RectangularHSection(100, 100, 2, 2)

	it('should calculate correctly its inner area', () => {
		expect(section.area).toBeCloseTo(784)
	})
	it('should calculate correctly its inertia around z axis', () => {
		expect(section.inertiaZ).toBeCloseTo(1255445.33)
	})
})
