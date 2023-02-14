import { Concrete21 } from '@/utils'
import {
	Element,
	ElementNode,
	RectangularHSection,
	Structure,
	Support,
} from '@classes'

// initial structure nodes
let nodes = {
	a: new Support('fixed', { x: 0, y: 0 }),
	b: new ElementNode({ x: 0, y: 2 }),
	c: new ElementNode({ x: 2, y: 2 }),
	d: new Support('fixed', { x: 2, y: 0 }),
	e: new ElementNode({ x: 0, y: 4 }),
	f: new ElementNode({ x: 2, y: 4 }),
}

// cross section
let section = new RectangularHSection(0.2, 0.2, 0, 0, Concrete21)

// elements
let leftColumn = new Element(nodes.a, nodes.b, section, 200000000)
let beam = new Element(nodes.b, nodes.c, section, 200000000)
let rightColumn = new Element(nodes.c, nodes.d, section, 200000000)
let otherCol = new Element(nodes.b, nodes.e, section, 200000000)
let otherOtherCol = new Element(nodes.c, nodes.f, section, 200000000)
let otherBeam = new Element(nodes.e, nodes.f, section, 200000000)

// structure instantiation
export const structure = new Structure(
	leftColumn,
	beam,
	rightColumn,
	otherCol,
	otherOtherCol,
	otherBeam,
)
