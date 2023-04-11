import { describe, expect, it } from 'vitest'
import { FrameSystem } from '@classes/complex-elements/frame-system'
import { ElementNode } from '@classes/nodes/element-node'
import { Element } from '@classes/complex-elements/element'
import { Concrete } from '@classes/others/material'
import { Hinge } from '@classes/others/moment-curvature'
import { RectangularSpanLoad } from '@classes/others/rectangular-span-load'
import {
	PushoverSolver,
	normalizeLoads2Unit,
} from '@classes/solvers/pushover-solver'
import { RectangularRCSection } from '@classes/sections/rectangular-cr'


describe('Lateral loads', () => {
	//DIMENSIONES GENERALES ESTRUCTURA
	let hlevel = 3
	let h = hlevel * 2

	//SE CREAN NODOS
	let n1 = new ElementNode({ x: 0, y: 0 })
	let n2 = new ElementNode({ x: 0, y: hlevel })
	let n3 = new ElementNode({ x: 0, y: hlevel * 2 })

	let n4 = new ElementNode({ x: 4, y: 0 })
	let n5 = new ElementNode({ x: 4, y: hlevel })
	let n6 = new ElementNode({ x: 4, y: hlevel * 2 })

	let n7 = new ElementNode({ x: 10, y: 0 })
	let n8 = new ElementNode({ x: 10, y: hlevel })
	let n9 = new ElementNode({ x: 10, y: hlevel * 2 })

	//SE RESTRINGEN GRADOS DE LIBERTAD
	n1.constraints.dx = true
	n1.constraints.dy = true
	n1.constraints.rz = true

	n4.constraints.dx = true
	n4.constraints.dy = true
	n4.constraints.rz = true

	n7.constraints.dx = true
	n7.constraints.dy = true
	n7.constraints.rz = true

	//MATERIALES
	let mat = new Concrete('Concrete21MPA', 21, 24, 20e6, 0.003)
	//let steel = SteelG60

	//DIMENSIONES DE SECCIONES
	let bcol = 0.4
	let hcol = 0.4
	let bvga = 0.3
	let hvga = 0.4

	//SECCIONES TRANSVERSALES ELEMENTOS
	let XScol = new RectangularRCSection(bcol, hcol, mat)
	let XSvga = new RectangularRCSection(bvga, hvga, mat)

	//SE CREAN COLUMNAS
	let c1 = new Element(n1, n2, XScol)
	let c2 = new Element(n2, n3, XScol)

	let c3 = new Element(n4, n5, XScol)
	let c4 = new Element(n5, n6, XScol)

	let c5 = new Element(n7, n8, XScol)
	let c6 = new Element(n8, n9, XScol)

	//SE CREAN VIGAS
	let b1 = new Element(n2, n5, XSvga)
	let b2 = new Element(n5, n8, XSvga)

	let b3 = new Element(n3, n6, XSvga)
	let b4 = new Element(n6, n9, XSvga)

	//SE JUNTAN LOS ELEMENTOS XD
	let elementsArray = [c1, c2, c3, c4, c5, c6, b1, b2, b3, b4]

	//ROTULAS PLASTICAS
	let hingeCol = new Hinge(250, 0, -250, 0, 'Moment')
	let hingeVga1 = new Hinge(100, 0, -150, 0, 'Moment') //4m
	let hingeVga2 = new Hinge(80, 0, -80, 0, 'Moment') //6m

	//INFORMACION DEL PORTICO
	let frm = new FrameSystem(...elementsArray)

	//ASIGNACION DE ROTULAS
	b1.assignHinge('initial', new Hinge(100, 0, -150, 0, 'Moment'))
	b1.assignHinge('final', new Hinge(100, 0, -150, 0, 'Moment'))
	b3.assignHinge('initial', new Hinge(100, 0, -150, 0, 'Moment'))
	b3.assignHinge('final', new Hinge(100, 0, -150, 0, 'Moment'))

	b2.assignHinge('initial', new Hinge(80, 0, -80, 0, 'Moment'))
	b2.assignHinge('final', new Hinge(80, 0, -80, 0, 'Moment'))
	b4.assignHinge('initial', new Hinge(80, 0, -80, 0, 'Moment'))
	b4.assignHinge('final', new Hinge(80, 0, -80, 0, 'Moment'))

	frm.elements.forEach((e) => {
		if (e.inclination == 0) {
		} else {
			e.assignHinge('initial', new Hinge(250, 0, -250, 0, 'Moment'))
			e.assignHinge('final', new Hinge(250, 0, -250, 0, 'Moment'))
		}
	})

	//CARGAS
	n3.addLoads({ fx: 1 })

	//AÑADIR NODO OBJETIVO
	let nobj = frm.node({ x: 0, y: h })

	it('should calculate capacity curve', () => {
		PushoverSolver.Run(frm, { x: 0, y: h }, 'stability')

		let result = PushoverSolver.capacityCurve()
		let curve = [
			[0, 0],
			[0,0],
			[14.310881223977484, 147.66291683391404],
			[16.076390584946605, 162.18732265341015],
			[20.04030648531222, 188.60706304261313],
			[20.107133374603613, 188.97587167713428],
			[21.482654931403697, 195.91118492134026],
			[27.476459635016305, 219.4549683869935],
			[38.803632573987585, 259.6790566595179],
			[39.10471507988475, 260.4153425961199],
			[40.88981935573586, 263.93386106074314],
			[46.63952675052916, 272.29498066227734],
			[46.990011987844305, 272.62359083866363],
			[-7632325136210832, 2112.1367983405753],
			[-13058055937014606, 2668.9324488443676],
		]

		expect(result[5][0]).toBeCloseTo(curve[5][0], 1)
	})
})