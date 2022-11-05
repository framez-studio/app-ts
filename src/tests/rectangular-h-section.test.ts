import { describe, expect, it } from 'vitest'
import { RectangularHSection } from '@classes'

describe('Rectangular Hollow Section', () => {
	const section = new RectangularHSection(0.1, 0.1, 0.002, 0.002)

	it('should calculate correctly its inner area', () => {
		expect(section.area).toBeCloseTo(0.000784)
	})
	it('should calculate correctly its inertia around z axis', () => {
		expect(section.inertiaZ).toBeCloseTo(0.000001255)
	})
})
