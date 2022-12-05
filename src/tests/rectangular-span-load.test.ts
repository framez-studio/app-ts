import { describe, expect, it } from 'vitest'
import {
	Element,
	ElementNode,
	RectangularHSection,
	RectangularSpanLoad,
} from '@classes'
import { Concrete21 } from '@utils'

describe('Rectangular Span Load Class', () => {
	const iNode = new ElementNode({ x: 0, y: 0 })
	const fNode = new ElementNode({ x: 2, y: 0 })
	const section = new RectangularHSection(2, 2, 0, 0, Concrete21)
	const element = new Element(iNode, fNode, section, 200000)
	const w = 20
	const l = element.length
	let a = 0
	let b = element.length
	const load = new RectangularSpanLoad(element, w, a, b)
	it('should calculate correctly the FEF on a full span load', () => {
		let expected = {
			initial: {
				fx: 0,
				fy: (w * l) / 2,
				mz: (w * l ** 2) / 12,
			},
			final: {
				fx: 0,
				fy: (w * l) / 2,
				mz: -(w * l ** 2) / 12,
			},
		}
		let result = load.fef
		expect(result).toEqual(expected)
	})
	it('should return its resultants as a matrix', () => {
		let expected = [
			[load.fef.initial.fx],
			[load.fef.initial.fy],
			[load.fef.initial.mz],
			[load.fef.final.fx],
			[load.fef.final.fy],
			[load.fef.final.mz],
		]
		expect(load.fefArray).toEqual(expected)
	})
	it('should provide x-forces equilibrium', () => {
		let result = load.fef
		let sum = result.initial.fx + result.final.fx
		expect(sum).toBe(0)
	})
	it('should provide y-forces equilibrium', () => {
		let result = load.fef
		let sum = result.initial.fy + result.final.fy - w * (b - a)
		expect(sum).toBe(0)
	})
	it('should provide momentum equilibrium', () => {
		let result = load.fef
		let sum =
			result.initial.mz +
			result.final.mz +
			result.final.fy * l -
			(w * (b - a) ** 2) / 2
		expect(sum).toBe(0)
	})
	it(`should allow calculate correctly its value after the element receives a release at the initial node`, () => {
		let expected = {
			initial: {
				fx: 0,
				fy: (3 * w * l) / 8,
				mz: 0,
			},
			final: {
				fx: 0,
				fy: (5 * w * l) / 8,
				mz: (-w * l ** 2) / 8,
			},
		}
		element.release('initial', 'rz')
		let result = load.fef
		expect(result).toEqual(expected)
	})
	it(`should allow calculate correctly its value after the element receives a release at the final node`, () => {
		let expected = {
			initial: {
				fx: 0,
				fy: (5 * w * l) / 8,
				mz: (w * l ** 2) / 8,
			},
			final: {
				fx: 0,
				fy: (3 * w * l) / 8,
				mz: 0,
			},
		}
		element.unrelease('initial', 'rz')
		element.release('final', 'rz')
		let result = load.fef
		expect(result).toEqual(expected)
	})
	it(`should allow calculate correctly its value after the element receives a release at both nodes`, () => {
		let expected = {
			initial: {
				fx: 0,
				fy: (w * l) / 2,
				mz: 0,
			},
			final: {
				fx: 0,
				fy: (w * l) / 2,
				mz: 0,
			},
		}
		element.release('initial', 'rz')
		let result = load.fef
		expect(result).toEqual(expected)
	})
})
