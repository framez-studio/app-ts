import { RectangularRCSection } from '@classes/sections/rectangular-cr'
import { BarNo4 } from '@utils/bar-cr'
import { Concrete21 } from '@utils/material'
import { describe, it, expect } from 'vitest'

describe('description', () => {
	const section = new RectangularRCSection(300, 400, Concrete21)
	section.addRowReinforcement(240, 4, BarNo4)
	section.addRowReinforcement(40, 4, BarNo4)
	section.addRowReinforcement(100, 4, BarNo4)
	section.addRowReinforcement(60, 4, BarNo4)
	section.sortReinforcement()
	const i = section.reinforcement.length
	it('should sort correctly reinforcement', () => {
		expect(section.reinforcement[0].distance).toBeCloseTo(40)
		expect(section.reinforcement[i - 1].distance).toBeCloseTo(240)
	})

	it('should calculate correctly As', () => {
		expect(section.as()).toBeCloseTo(2064)
		expect(section.as(40)).toBeCloseTo(516)
	})
})
