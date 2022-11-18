import { describe, expect, it } from 'vitest'
import { RectangularHSection } from '@classes'
import { Steel } from '@/entities/classes/others/material'

describe('Rectangular Hollow Section', () => {
	let mat = new Steel("SteelG60",200,70,420)
	const section = new RectangularHSection(0.1, 0.1, 0.002, 0.002,mat)

	it('should calculate correctly its inner area', () => {
		expect(section.area).toBeCloseTo(0.000784)
	})
	it('should calculate correctly its inertia around z axis', () => {
		expect(section.inertiaZ).toBeCloseTo(0.000001255)
	})
})
