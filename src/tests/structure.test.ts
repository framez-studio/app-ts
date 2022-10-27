import { describe, expect, it } from 'vitest'
import { Element } from '../entities/classes/complex-elements/element'
import { Structure } from '../entities/classes/complex-elements/structure'
import { ElementNode } from '../entities/classes/nodes/element-node'
import { RectangularHSection } from '../entities/classes/sections/rectangular-h-section'

describe('Structure Class', () => {
	const section = new RectangularHSection(0.1, 0.1, 0.002, 0.002)
	let e = 200000000
	let a = new ElementNode(0, 0)
	let b = new ElementNode(0, 3)
	let c = new ElementNode(4, 3)
	let d = new ElementNode(4, 0)
	let lCol = new Element(a, b, section, e)
	let beam = new Element(b, c, section, e)
	let rCol = new Element(c, d, section, e)
	const structure = new Structure(lCol, rCol, beam)

	it('should return an array with the given elements in the constructor', () => {
		expect(structure.elements).toEqual([lCol, rCol, beam])
	})
	it('should return the nodes ordered by x first and then y coordinates', () => {
		expect(structure.nodes).toEqual([a, b, c, d])
	})
	it('should allow to access one of its nodes by coordinates', () => {
		expect(structure.node(0, 0)).toBe(a)
	})
	it('should throw an error if trying to get a node with non-existent coordinates', () => {
		expect(() => structure.node(100, 100)).toThrowError()
	})
	it('should allow to access one of its elements by coordinates', () => {
		expect(structure.element({ x: 0, y: 0 }, { x: 0, y: 3 })).toBe(lCol)
	})
	it('should throw an error if trying to get an element with non-existent coordinates', () => {
		expect(() =>
			structure.element({ x: 0, y: 100 }, { x: 0, y: 3 }),
		).toThrowError()
	})
	it('should allow to add a support with the coordinates of an existing node in the structure', () => {
		structure.setSupport(0, 0, 'hinge')
		expect(a.constraints.dx).toBeTruthy()
		expect(a.constraints.dy).toBeTruthy()
		expect(a.constraints.rz).toBeFalsy()
	})
	it('should throw an error if trying to add a support with non-existent coordinates', () => {
		expect(() => structure.setSupport(100, 0, 'hinge')).toThrow()
	})
})
