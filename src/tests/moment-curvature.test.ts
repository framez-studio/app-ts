import { Concrete } from '@classes/others/material'
import { RectangularRCSection } from '@classes/sections/rectangular-cr'
import { BarNo6, BarNo5 } from '@utils/bar-cr'
import {
	NominalNeutralAxisWhitney,
	NominalMomentWhitney,
	YieldNeutralAxis,
	YieldMomentRectangularRC,
} from '@utils/moment-curvature'
import { describe, it, expect } from 'vitest'

describe('Nominal moment RSCR', () => {
	let mat1 = new Concrete('Concrete21MPA', 21, 24, 21538, 0.004)
	let section = new RectangularRCSection(400, 400, mat1)
	section.addRowReinforcement(60, 4, BarNo6)
	section.addRowReinforcement(240, 4, BarNo6)

	it('should calculate correctly} c whitney', () => {
		expect(NominalNeutralAxisWhitney(section)).toBeCloseTo(65.86)
	})
	it('should calculate correctly nominal moment', () => {
		expect(NominalMomentWhitney(section)).toBeCloseTo(99438410.384)
	})
})

describe('Yield moment RSCR', () => {
	let mat1 = new Concrete('Concrete21MPA', 21, 24, 21538, 0.004)
	let section = new RectangularRCSection(400, 400, mat1)
	section.addRowReinforcement(60, 4, BarNo6)
	section.addRowReinforcement(240, 4, BarNo6)

	it('should calculate correctly c yield', () => {
		expect(YieldNeutralAxis(section)).toBeCloseTo(83.8834)
	})
	it('should calculate correctly yield moment', () => {
		expect(YieldMomentRectangularRC(section)).toBeCloseTo(99706731.585)
	})
})

describe('Nominal moment Tarea', () => {
	let mat2 = new Concrete('Concrete21MPA', 21, 24, 21538, 0.003)
	let section = new RectangularRCSection(300, 400, mat2)
	section.addRowReinforcement(47.94, 4, BarNo5)
	section.addRowReinforcement(352.06, 3, BarNo5)

	it('should calculate correctly c by whitney', () => {
		expect(NominalNeutralAxisWhitney(section)).toBeCloseTo(50.216876)
	})

	it('should calculate correctly nominal moment', () => {
		expect(NominalMomentWhitney(section)).toBeCloseTo(82164696.5246)
	})
})
