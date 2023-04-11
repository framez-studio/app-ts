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
import { StaticSolver } from "@classes/solvers/static-solver"
import { MomentCurvatureFinal2Section } from "@utils/moment-curvature"
import { ResultSetDependencies } from "mathjs"
import { describe, expect, it } from "vitest"

describe('Case 2: Oficial Test', () => {
    //materials
    const Cncr21000KPA = new Concrete("Cncr21MPA",21000,24,17872000,0.003)
    const Steel60 = new Steel("G60",200e6,70,420e3)

	//sections geometry & material definition
	const col350x350 = new RectangularRCSection(0.35, 0.35, Cncr21000KPA)
	const vga400x300 = new RectangularRCSection(0.3, 0.4, Cncr21000KPA)

    //reinforcement definition
    let barn5 = new BarCR((25.4/1000)*5/8,Steel60)

    //Reinforce Sections
    col350x350.addRowReinforcement(0.045,4,barn5)
    col350x350.addRowReinforcement(0.13,2,barn5)
    col350x350.addRowReinforcement(0.215,2,barn5)
    col350x350.addRowReinforcement(0.30,4,barn5)

    vga400x300.addRowReinforcement(0.045,4,barn5)
    vga400x300.addRowReinforcement(0.355,3,barn5)

	//nodes definition
	let a = new Support('fixed', { x: 0, y: 0 })
	let b = new ElementNode({ x: 0, y: 3 })
	let c = new ElementNode({ x: 6, y: 3 })
	let d = new Support('fixed', { x: 6, y: 0 })
	let f = new ElementNode({ x: 9, y: 3 })
	let e = new Support('fixed', { x: 9, y: 0 })
	
	//elements definition
	let lCol = new Element(a, b, col350x350)
	let beam = new Element(b, c, vga400x300)
	let cCol = new Element(d, c, col350x350)
	let beam2 = new Element(c, f, vga400x300)
	let rCol = new Element(e, f, col350x350)
	
	//structure definition
	let frm = new FrameSystem(lCol, beam, cCol, beam2, rCol)
	b.addLoads({fx: 1})

	//loads definition & assign
	//let load = new RectangularSpanLoad(beam, 40)
	//let load2 = new RectangularSpanLoad(beam2, 40)

	it(`Case 2: Capacity Curve`, () => {
		let r = StaticSolver.displacements(frm)
		let e = 0
		expect(r).toBeCloseTo(e)
	})
})


