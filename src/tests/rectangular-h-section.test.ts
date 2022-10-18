import { describe, expect, it } from 'vitest'
import { RectangularHSection } from '../entities/classes/sections/rectangular-h-section'

describe('Rectangular Hollow Section', () => {
	const section = new RectangularHSection(4, 6, 1, 1.5)

	it('should calculate correctly its inner area', () => {
		expect(section.area).toBe(18)
	})
	it('should calculate correctly its inertia around z axis', () => {
		expect(section.inertiaZ).toBe(67.5)
	})
})
