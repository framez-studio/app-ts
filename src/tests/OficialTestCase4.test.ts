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
import { IFrameSystem, IGeneratorElementConfig, ISteelNumRowsState, ISteelRowState } from "@interfaces"
import { epsilonmax_cnrc } from "@utils/material"
import { MomentCurvatureFinal2Section } from "@utils/moment-curvature"
import { generateFramezSystem } from "@utils/structure-generator"
import { describe, expect, it } from "vitest"



describe('Case 4: Oficial Test', () => {
    //materials
    const Cncr21000KPA = new Concrete("Cncr21MPA",21000,24,21538105.77,0.003)
    const Steel60 = new Steel("G60",200e6,70,420e3)

	//sections geometry & material definition

	const col = new RectangularRCSection(1.2, 1.2, Cncr21000KPA)
	const vga = new RectangularRCSection(0.3, 0.4, Cncr21000KPA)

    //reinforcement definition
    let barn8 = new BarCR((25.4/1000),Steel60)
    let barn5 = new BarCR((25.4/1000)*5/8,Steel60)

	//Reinforce Sections
	let sc = (col.h - 0.04*2 - barn8.diameter) / 10
    col.addRowReinforcement(0.04+barn8.diameter*0.5, 4, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*1, 2, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*2, 2, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*3, 2, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*4, 2, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*5, 2, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*6, 2, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*7, 2, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*8, 2, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*9, 2, barn8)
    col.addRowReinforcement(0.04+barn8.diameter*0.5+sc*10, 4, barn8)

    vga.addRowReinforcement(0.045, 4, barn5)
    vga.addRowReinforcement(0.355, 3, barn5)

	let mvga = MomentCurvatureFinal2Section(vga)
	let mcol = MomentCurvatureFinal2Section(col)


    //Reinforce Sections
    let rc0 = {distance:0.04+barn8.diameter*0.5, quantity: 4, diameter: barn8.diameter}
    let rc1 = {distance:0.04+barn8.diameter*0.5+sc*1, quantity: 2, diameter: barn8.diameter}
    let rc2 = {distance:0.04+barn8.diameter*0.5+sc*2, quantity: 2, diameter: barn8.diameter}
    let rc3 = {distance:0.04+barn8.diameter*0.5+sc*3, quantity: 2, diameter: barn8.diameter}
    let rc4 = {distance:0.04+barn8.diameter*0.5+sc*4, quantity: 2, diameter: barn8.diameter}
    let rc5 = {distance:0.04+barn8.diameter*0.5+sc*5, quantity: 2, diameter: barn8.diameter}
    let rc6 = {distance:0.04+barn8.diameter*0.5+sc*6, quantity: 2, diameter: barn8.diameter}
    let rc7 = {distance:0.04+barn8.diameter*0.5+sc*7, quantity: 2, diameter: barn8.diameter}
    let rc8 = {distance:0.04+barn8.diameter*0.5+sc*8, quantity: 2, diameter: barn8.diameter}
    let rc9 = {distance:0.04+barn8.diameter*0.5+sc*9, quantity: 2, diameter: barn8.diameter}
    let rc10 = {distance:0.04+barn8.diameter*0.5+sc*10, quantity: 4, diameter: barn8.diameter}

    let rb1 = {distance:0.045, quantity: 4, diameter: barn5.diameter}
    let rb2 = {distance:0.355, quantity: 3, diameter: barn5.diameter} as ISteelNumRowsState

	let colconfig: IGeneratorElementConfig = {
		material: {
			young: Cncr21000KPA.young,
			weight: Cncr21000KPA.weight,
			fc: Cncr21000KPA.fc,
			epsilon_max: Cncr21000KPA.epsilon_max
		},
		section: {base: col.b, height: col.h},
		steel: {
			fy: Steel60.fy,
			young: Steel60.young,
			rows: [rc0,rc1,rc2,rc3,rc4,rc5,rc6,rc7,rc8,rc9,rc10] as ISteelNumRowsState[]
		},
		load: 0,
		momentCurvature: {automatic: false,
			moment: {min: -2333.61224687115, max: 2333.61224687115},
			curvature: {min:-0.006417219322153028,max:0.006417219322153028}}
	}
	let bconfig: IGeneratorElementConfig =  {
		material: {
			young: Cncr21000KPA.young,
			weight: Cncr21000KPA.weight,
			fc: Cncr21000KPA.fc,
			epsilon_max: Cncr21000KPA.epsilon_max
		},
		section: {base: vga.b, height: vga.h},
		steel: {
			fy: Steel60.fy,
			young: Steel60.young,
			rows: [rb1,rb2]
		},
		load: 18,
		momentCurvature: {automatic: false,
					curvature: {min: -0.008373508332036164, max: 0.007968569780123641},
					moment: {min:-106.82291909497025,max:81.16352997458456}} 
	}
	let gconf = {levels: [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
		spans: [6,6,6,6,6,6,6,6,6,6],
		columns: colconfig as IGeneratorElementConfig,
		beams: bconfig as IGeneratorElementConfig
	}
	let frm: IFrameSystem = generateFramezSystem(gconf).structure

	it(`Case 4: Capacity Curve`, () => {
		normalizeLoads2Unit(frm,3600)
		console.log('step 1')
		PushoverSolver.Run(frm,{x: 0, y:60},'service',3600)
		console.log('step 2')
		let resultService = PushoverSolver.serviceCapacityCurve()
		console.log('step 3')
		frm.resetLoadstoZero()
		console.log('step 4')
		let av = 0.25
		let fv = 0.25
		FHE.setFHEinNodes(frm,1,2,av,fv)
		console.log('step 5')
		PushoverSolver.Run(frm,{x: 0, y:60},'stability')
		console.log('step 6')
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