import { FHE } from '@classes'
import { describe, expect, it } from 'vitest'

describe('Fundamental Period FHE Method', () => {
	let av = 0.25
	let fv = 0.25
	let n = 5
	let h = 15
	let t1 = FHE.fundamentalPeriod(1, av, fv, n, h)
	let t2 = FHE.fundamentalPeriod(2, av, fv, n, h)
	let t3 = FHE.fundamentalPeriod(3, av, fv, n, h)
	it(`Method 1`, () => {
		expect(t1).toBeCloseTo(0.000001255)
	})
	it(`Method 2`, () => {
		expect(t2).toBeCloseTo(0.000001255)
	})
	it(`Method 3`, () => {
		expect(t3).toBeCloseTo(0.000001255)
	})
})

/*
fundamental Periodic
cvx
vs
force
*/
