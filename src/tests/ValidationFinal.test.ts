import { Element } from "@classes/complex-elements/element"
import { Structure } from "@classes/complex-elements/structure"
import { ElementNode } from "@classes/nodes/element-node"
import { Support } from "@classes/nodes/support"
import { Concrete, Steel } from "@classes/others/material"
import { RectangularSpanLoad } from "@classes/others/rectangular-span-load"
import { BarCR } from "@classes/sections/bar-cr"
import { RectangularRCSection } from "@classes/sections/rectangular-cr"
import { MomentCurvatureFinal2Section } from "@utils/moment-curvature"
import { describe, expect, it } from "vitest"



describe('Case 1: Oficial Test', () => {
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
    vga400x300.addRowReinforcement(0.355,4,barn5)

	//nodes definition
	let a = new Support('fixed', { x: 0, y: 0 })
	let b = new ElementNode({ x: 0, y: 3 })
	let c = new ElementNode({ x: 6, y: 3 })
	let d = new Support('fixed', { x: 6, y: 0 })

	//elements definition
	let lCol = new Element(a, b, col350x350)
	let beam = new Element(b, c, vga400x300)
	let rCol = new Element(d, c, col350x350)

	//structure definition
	let structure = new Structure(lCol, beam, rCol)
	let r = MomentCurvatureFinal2Section(vga400x300)

	//loads definition & assign
	let load = new RectangularSpanLoad(beam, 1)

	it(`Should calculate correctly its displacements tarea`, () => {
		let matrix = structure.stiffness('reduced')
		let f = structure.fef('reduced')
		let stcol = beam.fef('local')
		let expected = [
			[0],
			[0],
			[0],
			[0.001311e-3],
			[-0.003411e-3],
			[-6.4e-5],
			[-0.001311e-3],
			[-0.003411e-3],
			[6.4e-5],
			[0],
			[0],
			[0],
		]
		let result = structure.displacements
		result.forEach((row, i) => {
			row.forEach((value, j) => {
				expect(value).toBeCloseTo(expected[i][j])
			})
		})
	})
})


//DIMENSIONES mm
//YOUNG MPa
//FUERZAS Kn
//MOMENTOS Kn*m
//LONGITUDES metros
//EPSILON
//DISTANCIA DE REFUERZO mm
//DIAMETROS DE LAS BARRAS mm
//FY Mpa
//COORD (m)
