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
import { MomentCurvatureFinal2Section } from "@utils/moment-curvature"
import { describe, expect, it } from "vitest"



describe('Case 1: Oficial Test', () => {
    //materials
    const Cncr21000KPA = new Concrete("Cncr21MPA",21000,24,17872000,0.003)
    const Steel60 = new Steel("G60",200e6,70,420e3)

	//sections geometry & material definition
	const col350x350 = new RectangularRCSection(0.35, 0.35, Cncr21000KPA)
	const vga300x400 = new RectangularRCSection(0.3, 0.4, Cncr21000KPA)

    //reinforcement definition
    let barn5 = new BarCR((25.4/1000)*5/8,Steel60)

    //Reinforce Sections
    col350x350.addRowReinforcement(0.045,4,barn5)
    col350x350.addRowReinforcement(0.13,2,barn5)
    col350x350.addRowReinforcement(0.215,2,barn5)
    col350x350.addRowReinforcement(0.30,4,barn5)

    vga300x400.addRowReinforcement(0.045,4,barn5)
    vga300x400.addRowReinforcement(0.355,3,barn5)

	//nodes definition
	let a = new Support('fixed', { x: 0, y: 0 })
	let b = new ElementNode({ x: 0, y: 3 })
	let c = new ElementNode({ x: 6, y: 3 })
	let d = new Support('fixed', { x: 6, y: 0 })

	//elements definition
	let lCol = new Element(a, b, col350x350)
	let beam = new Element(b, c, vga300x400)
	let rCol = new Element(d, c, col350x350)

	//structure definition
	let frm = new FrameSystem(lCol, beam, rCol)
	let MnVga = MomentCurvatureFinal2Section(vga300x400)
	let MnCol = MomentCurvatureFinal2Section(col350x350)

	lCol.assignHinge('initial',new Hinge(MnCol.maxMoment,MnCol.maxCurv,MnCol.minMoment,MnCol.minCurve,'Moment'))
	lCol.assignHinge('final',new Hinge(MnCol.maxMoment,MnCol.maxCurv,MnCol.minMoment,MnCol.minCurve,'Moment'))
	rCol.assignHinge('initial',new Hinge(MnCol.maxMoment,MnCol.maxCurv,MnCol.minMoment,MnCol.minCurve,'Moment'))
	rCol.assignHinge('final',new Hinge(MnCol.maxMoment,MnCol.maxCurv,MnCol.minMoment,MnCol.minCurve,'Moment'))
	beam.assignHinge('initial',new Hinge(MnVga.maxMoment,MnVga.maxCurv,MnVga.minMoment,MnVga.minCurve,'Moment'))
	beam.assignHinge('final',new Hinge(MnVga.maxMoment,MnVga.maxCurv,MnVga.minMoment,MnVga.minCurve,'Moment'))


	//loads definition & assign
	let load = new RectangularSpanLoad(beam, 40)

	it(`Case 1: Capacity Curve`, () => {
		normalizeLoads2Unit(frm,40)
		PushoverSolver.Run(frm,{x: 0, y:3},'service',40)
		let resultService = PushoverSolver.serviceCapacityCurve()
		frm.resetLoadstoZero()
		let av = 0.25
		let fv = 0.25
		FHE.setFHEinNodes(frm,1,2,av,fv)
		PushoverSolver.Run(frm,{x: 0, y:3},'stability')
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