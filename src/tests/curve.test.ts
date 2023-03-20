import { Element } from '@classes/complex-elements/element'
import { FrameSystem } from '@classes/complex-elements/frame-system'
import { ElementNode } from '@classes/nodes/element-node'
import { Hinge } from '@classes/others/moment-curvature'
import { RectangularRCSection } from '@classes/sections/rectangular-cr'
import { FHE } from '@classes/seismic-analysis/fhe'
import { PushoverSolver } from '@classes/solvers/pushover-solver'
import { Concrete21Curve } from '@utils/material'
import clone from 'just-clone'
import { describe, expect, it } from 'vitest'

describe('Tarea osi osi', () => {
	//MATERIALES
	let mat = Concrete21Curve
	//let steel = SteelG60

	//NODOS
	let n1 = new ElementNode({ x: 0, y: 0 })
	let n2 = new ElementNode({ x: 0, y: 3 })
	let n3 = new ElementNode({ x: 6, y: 3 })
	let n4 = new ElementNode({ x: 6, y: 0 })
	n1.constraints.dx = true
	n1.constraints.dy = true
	n1.constraints.rz = true

	n4.constraints.dx = true
	n4.constraints.dy = true
	n4.constraints.rz = true

	//DIMENSIONES DE SECCIONES
	let bcol = 0.35
	let hcol = 0.35
	let bvga = 0.3
	let hvga = 0.4

	//SECCIONES TRANSVERSALES ELEMENTOS
	let XScol = new RectangularRCSection(bcol, hcol, mat)
	let XSvga = new RectangularRCSection(bvga, hvga, mat)

	//ELEMENTOS
	let col1 = new Element(n1, n2, XScol)
	let col2 = new Element(n4, n3, XScol)
	let vga = new Element(n2, n3, XSvga)

	//ROTULAS PLASTICAS
	let hingeCol = new Hinge(124.3974, 0, -124.3974, 0, 'Moment')
	let hingeVga = new Hinge(81.73, 0, -107.2, 0, 'Moment')

	//INFORMACION DEL PORTICO
	let nspans = 1
	let nlvl = 1
	let h = 3
	let width = 6

	let elementsArray = [col1, vga, col2]
	let frm = new FrameSystem(...elementsArray)

	//ASIGNACION DE ROTULAS
	frm.elements.forEach((e) => {
		if (e.inclination == 0) {
			e.assignHinge('initial', clone(hingeVga))
			e.assignHinge('final', clone(hingeVga))
		} else {
			e.assignHinge('initial', clone(hingeCol))
			e.assignHinge('final', clone(hingeCol))
		}
	})

	//SE AÑADEN LAS CARGAS
	FHE.setFHEinNodes(frm, 1, 2, 0.25, 1.0)
	//n2.addLoads({fx:1})

	it('should calculate capacity curve', () => {
		PushoverSolver.Run(frm, { x: 0, y: h }, 'stability')
		let result = PushoverSolver.capacityCurve()
		let curve = [
			[0, 0],
			[9.307955139895991, 137.37299232114896],
			[9.307955139895991, 137.37299232114896],
			[9.321457173932423, 137.4182666666662],
			[16.607671267901367, 145.9082666666659],
		]
		expect(result[0][0]).toBeCloseTo(curve[0][0], 1)
		expect(result[1][0]).toBeCloseTo(curve[1][0], 1)
		expect(result[2][0]).toBeCloseTo(curve[2][0], 1)
		expect(result[3][0]).toBeCloseTo(curve[3][0], 1)
		expect(result[4][0]).toBeCloseTo(curve[4][0], 1)
		expect(result[0][1]).toBeCloseTo(curve[0][1], 1)
		expect(result[1][1]).toBeCloseTo(curve[1][1], 1)
		expect(result[2][1]).toBeCloseTo(curve[2][1], 1)
		expect(result[3][1]).toBeCloseTo(curve[3][1], 1)
		expect(result[4][1]).toBeCloseTo(curve[4][1], 1)
	})
	/*
  PushoverSolver.reset()
  frm.resetLoadstoZero()
  frm.resetHingesStatus()
  n2.addLoads({fx:1})
  let w0 = 40
  let w = new RectangularSpanLoad(vga,w0,0,vga.length)
  normalizeLoads2Unit(frm,w0)
  it('calculate capacity curve with service analysis',()=>{
      PushoverSolver.Run(frm,{x: 0, y:h},'service',w0)
      PushoverSolver.Run(frm,{x: 0, y:h},'stability')
      let curve = PushoverSolver.capacityCurve()
  })
  */
})
