import { Element } from "@classes/complex-elements/element"
import { FrameSystem } from "@classes/complex-elements/frame-system"
import { ElementNode } from "@classes/nodes/element-node"
import { Support } from "@classes/nodes/support"
import { Concrete, Steel } from "@classes/others/material"
import { Hinge } from "@classes/others/moment-curvature"
import { RectangularSpanLoad } from "@classes/others/rectangular-span-load"
import { BarCR } from "@classes/sections/bar-cr"
import { RectangularRCSection } from "@classes/sections/rectangular-cr"
import { FHE } from "@classes/seismic-analysis/fhe"
import { PushoverSolver, normalizeLoads2Unit } from "@classes/solvers/pushover-solver"
import { MomentCurvatureFinal2Section, assignHinges2Element } from "@utils/moment-curvature"
import { forEach } from "mathjs"
import { describe, expect, it } from "vitest"



describe('Case 5: Oficial Test', () => {
	//nodos
	let n1 = new Support('fixed',{x: 0, y: 0})
	let n2 = new Support('fixed',{x: 5.79, y: 0})
	let n3 = new Support('fixed',{x: 11.19, y: 0})
	let n4 = new Support('fixed',{x: 15.19, y: 0})
	
	let n5 = new ElementNode({x: 0, y: 3.1})
	let n6 = new ElementNode({x: 5.79, y: 3.1})
	let n7 = new ElementNode({x: 11.19, y: 3.1})
	let n8 = new ElementNode({x: 15.19, y: 3.1})

	let n9 = new ElementNode({x: 0, y: 5.9})
	let n10 = new ElementNode({x: 5.79, y: 5.9})
	let n11 = new ElementNode({x: 11.19, y: 5.9})
	let n12 = new ElementNode({x: 15.19, y: 5.9})

	let n13 = new ElementNode({x: 0, y: 8.7})
	let n14 = new ElementNode({x: 5.79, y: 8.7})
	let n15 = new ElementNode({x: 11.19, y: 8.7})
	let n16 = new ElementNode({x: 15.19, y: 8.7})

	let n17 = new ElementNode({x: 0, y: 11.50})
	let n18 = new ElementNode({x: 5.79, y: 11.50})
	let n19 = new ElementNode({x: 11.19, y: 11.50})
	let n20 = new ElementNode({x: 15.19, y: 11.50})

	let n21 = new ElementNode({x: 0, y: 14.30})
	let n22 = new ElementNode({x: 5.79, y: 14.30})
	let n23 = new ElementNode({x: 11.19, y: 14.30})
	let n24 = new ElementNode({x: 15.19, y: 14.30})

	let n25 = new ElementNode({x: 0, y: 17.10})
	let n26 = new ElementNode({x: 5.79, y: 17.10})
	let n27 = new ElementNode({x: 11.19, y: 17.10})
	let n28 = new ElementNode({x: 15.19, y: 17.10})

    //materials
    const Cncr21000KPA = new Concrete("Cncr21MPA",21000,24,21538105.77,0.003)
    const Steel60 = new Steel("G60",200e6,70,420e3)

	//reinforcement bars
    let barn4 = new BarCR((25.4/1000)*4/8,Steel60)
    let barn5 = new BarCR((25.4/1000)*5/8,Steel60)
    let barn6 = new BarCR((25.4/1000)*6/8,Steel60)
    let barn7 = new BarCR((25.4/1000)*7/8,Steel60)

	//SECTION COLUMNS
	const c5x3 = new RectangularRCSection(0.5, 0.3, Cncr21000KPA)
	let er1= (c5x3.h-0.04*2-barn7.diameter)/2
	c5x3.addRowReinforcement(0.04+barn7.diameter*0.5,5,barn7)
	c5x3.addRowReinforcement(0.04+barn7.diameter*0.5+er1,2,barn7)
	c5x3.addRowReinforcement(0.04+barn7.diameter*0.5+er1*2,5,barn7)

	const c3x5 = new RectangularRCSection(0.3, 0.5, Cncr21000KPA)
	let er2= (c3x5.h-0.04*2-barn7.diameter)/4
	c3x5.addRowReinforcement(0.04+barn7.diameter*0.5,3,barn7)
	c3x5.addRowReinforcement(0.04+barn7.diameter*0.5+er2,2,barn7)
	c3x5.addRowReinforcement(0.04+barn7.diameter*0.5+er2*2,2,barn7)
	c3x5.addRowReinforcement(0.04+barn7.diameter*0.5+er2*3,2,barn7)
	c3x5.addRowReinforcement(0.04+barn7.diameter*0.5+er2*4,3,barn7)

	const c5x5 = new RectangularRCSection(0.5, 0.5, Cncr21000KPA)
	let er3= (c5x5.h-0.04*2-barn5.diameter)/3
	c5x5.addRowReinforcement(0.04+barn5.diameter*0.5,4,barn5)
	c5x5.addRowReinforcement(0.04+barn5.diameter*0.5+er3,2,barn5)
	c5x5.addRowReinforcement(0.04+barn5.diameter*0.5+er3*2,2,barn5)
	c5x5.addRowReinforcement(0.04+barn5.diameter*0.5+er3*3,4,barn5)

	//SECTIONS BEAMS 1 - 2
	const b12t1 = new RectangularRCSection(0.3, 0.4, Cncr21000KPA)
	b12t1.addRowReinforcement(0.04+barn6.diameter*0.5,2,barn6)
	b12t1.addRowReinforcement(0.4-0.04-barn4.diameter*0.5,3,barn4)

	const b12t2 = new RectangularRCSection(0.3, 0.4, Cncr21000KPA) //USAR EN NIVEL
	b12t2.addRowReinforcement(0.04+barn6.diameter*0.5,2,barn6)
	b12t2.addRowReinforcement(0.4-0.04-barn4.diameter*0.5,4,barn4)

	//SECTIONS BEAMS 2 - 3
	const b23t1 = new RectangularRCSection(0.3, 0.4, Cncr21000KPA)
	b23t1.addRowReinforcement(0.04+barn6.diameter*0.5,2,barn6)
	b23t1.addRowReinforcement(0.4-0.04-barn4.diameter*0.5,3,barn4)

	const b23t2 = new RectangularRCSection(0.3, 0.4, Cncr21000KPA) //USAR EN NIVEL
	b23t2.addRowReinforcement(0.04+barn6.diameter*0.5,3,barn6)
	b23t2.addRowReinforcement(0.4-0.04-barn4.diameter*0.5,4,barn4)

	//SECTIONS BEAMS 3 - 4
	const b34t1 = new RectangularRCSection(0.3, 0.4, Cncr21000KPA)
	b34t1.addRowReinforcement(0.04+barn6.diameter*0.5,2,barn6)
	b34t1.addRowReinforcement(0.4-0.04-barn4.diameter*0.5,3,barn4)

	const b34t2 = new RectangularRCSection(0.3, 0.4, Cncr21000KPA) //USAR EN NIVEL
	b34t2.addRowReinforcement(0.04+barn6.diameter*0.5,3,barn6)
	b34t2.addRowReinforcement(0.4-0.04-barn4.diameter*0.5,4,barn4)


	//BEAMS ELEMENTS
	let beam1 = new Element(n25,n26,b12t1)
	let beam2 = new Element(n21,n22,b12t1)
	let beam3 = new Element(n17,n18,b12t2)
	let beam4 = new Element(n13,n14,b12t1)
	let beam5 = new Element(n9,n10,b12t1)
	let beam6 = new Element(n5,n6,b12t1)

	let beam7 = new Element(n26,n27,b23t1)
	let beam8 = new Element(n22,n23,b23t2)
	let beam9 = new Element(n18,n19,b23t2)
	let beam10 = new Element(n14,n15,b23t2)
	let beam11 = new Element(n10,n11,b23t2)
	let beam12 = new Element(n6,n7,b23t1)

	let beam13 = new Element(n27,n28,b34t1)
	let beam14 = new Element(n23,n24,b34t2)
	let beam15 = new Element(n19,n20,b34t2)
	let beam16 = new Element(n15,n16,b34t2)
	let beam17 = new Element(n11,n12,b34t2)
	let beam18 = new Element(n7,n8,b34t1)

	//COLUMNS ELEMENTS
	let col1 = new Element(n1,n5,c3x5)
	let col2 = new Element(n5,n9,c3x5)
	let col3 = new Element(n9,n13,c3x5)
	let col4 = new Element(n13,n17,c3x5)
	let col5 = new Element(n17,n21,c3x5)
	let col6 = new Element(n21,n25,c3x5)

	let col7 = new Element(n2,n6,c5x5)
	let col8 = new Element(n6,n10,c5x5)
	let col9 = new Element(n10,n14,c5x5)
	let col10 = new Element(n14,n18,c5x5)
	let col11 = new Element(n18,n22,c5x5)
	let col12 = new Element(n22,n26,c5x5)

	let col13 = new Element(n3,n7,c5x5)
	let col14 = new Element(n7,n11,c5x5)
	let col15 = new Element(n11,n15,c5x5)
	let col16 = new Element(n15,n19,c5x5)
	let col17 = new Element(n19,n23,c5x5)
	let col18 = new Element(n23,n27,c5x5)

	let col19 = new Element(n4,n8,c5x3)
	let col20 = new Element(n8,n12,c5x3)
	let col21 = new Element(n12,n16,c5x3)
	let col22 = new Element(n16,n20,c5x3)
	let col23 = new Element(n20,n24,c5x3)
	let col24 = new Element(n24,n28,c5x3)

	let bS = [beam1,beam2,beam3,beam4,beam5,beam7,beam8,beam9,beam10,beam11,beam13,beam14,beam15,beam16,beam17]
	let bR = [beam6,beam12,beam18]
	

	//structure definition
	let frm = new FrameSystem(beam1,beam2,beam3,beam4,beam5,beam6,beam7,beam8,beam9,beam10,beam11,beam12,beam13,beam14,beam15,beam16,beam17,beam18,col1,col2,col3,col4,col5,col6,col7,col8,col9,col10,col11,col12,col13,col14,col15,col16,col17,col18,col19,col20,col21,col22,col23,col24)
	
	//LOAD BEAMS
	bS.forEach(b => {new RectangularSpanLoad(b,15.65)});
	bR.forEach(b => {new RectangularSpanLoad(b,7.19)});
	let cS = [col1,col2,col3,col4,col5,col6,col7,col8,col9,col10,col11,col12,col13,col14,col15,col16,col17,col18,col19,col20,col21,col22,col23,col24]
	cS.forEach(b => {new RectangularSpanLoad(b,0)});

	frm.elements.forEach(e => {
		assignHinges2Element({element:e,node:'both',hingeType: 'Moment'})
	});
	it(`Case 5: Capacity Curve`, () => {
		normalizeLoads2Unit(frm,1000)
		PushoverSolver.Run(frm,{x: 0, y:17.10},'service',1000)
		let resultService = PushoverSolver.serviceCapacityCurve()
		frm.resetLoadstoZero()
		let av = 0.25
		let fv = 0.25
		FHE.setFHEinNodes(frm,1,2,av,fv)
		PushoverSolver.Run(frm,{x: 0, y:17.10},'stability')
		let result = PushoverSolver.capacityCurve()
		let curve = [
			[
			  0,
			  0,
			],
			[
			  2.168906216640667,
			  26.561555269272503,
			],
			[
			  9.03978159142373,
			  77.3273914999848,
			],
			[
			  16.474934936792515,
			  113.73691035022765,
			],
			[
			  46.34900826069217,
			  142.6605963003615,
			],
		  ]
		for (let i = 0; i < result.length; i++) {
			const e = result[i];
			expect(e[0]).toBeCloseTo(curve[i][0])
			expect(e[1]).toBeCloseTo(curve[i][1])
		}
	})
})