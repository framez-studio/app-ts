import { Concrete, RectangularSectionCR } from "@/entities/classes";
import { BarNo5, BarNo6 } from "@/utils/bar-cr";
import { cy, c_whitney, mn_whitney, my_sectionCR } from "@/utils/moment-curvature";
import { describe, it, expect } from "vitest";

describe('Nominal moment RSCR', () => {
    let mat1 = new Concrete("Concrete21MPA",21,24,21538,0.004)
    let section = new RectangularSectionCR(400,400,mat1)
    section.addRowReinforcement(60,4,BarNo6)
    section.addRowReinforcement(240,4,BarNo6)

    it('should calculate correctly} c whitney',()=>{
        expect(c_whitney(section)).toBeCloseTo(65.68)
    })
    it('should calculate correctly nominal moment',()=>{
        expect(mn_whitney(section)).toBeCloseTo( 98671347.18)  
    })
    
})

describe('Yield moment RSCR', () => {
    let mat1 = new Concrete("Concrete21MPA",21,24,21538,0.004)
    let section = new RectangularSectionCR(400,400,mat1)
    section.addRowReinforcement(60,4,BarNo6)
    section.addRowReinforcement(240,4,BarNo6)

    it('should calculate correctly} c yield',()=>{
        expect(cy(section)).toBeCloseTo(83.656615)
    })
    it('should calculate correctly yield moment',()=>{
        expect(my_sectionCR(section)).toBeCloseTo(98885582.52)  
    })
    
})

describe('Nominal moment Tarea', () => {
    let mat2 = new Concrete("Concrete21MPA",21,24,21538,0.003)
    let section = new RectangularSectionCR(300,400,mat2)
    section.addRowReinforcement(47.94,4,BarNo5)
    section.addRowReinforcement(352.06,3,BarNo5)

    it('should calculate correctly c whitney',()=>{
        expect(c_whitney(section)).toBeCloseTo(50.34)
    })

    it('should calculate correctly nominal moment',()=>{
        expect(mn_whitney(section)).toBeCloseTo(82720558.09)  
 })    
})    

describe('Nominal moment Tarea', () => {
    let mat2 = new Concrete("Concrete21MPA",21,24,21538,0.003)
    let section = new RectangularSectionCR(300,400,mat2)
    section.addRowReinforcement(47.94,4,BarNo5)
    section.addRowReinforcement(352.06,3,BarNo5)

    it('should calculate correctly c whitney',()=>{
        expect(cy(section)).toBeCloseTo(50.34)
    })

    it('should calculate correctly nominal moment',()=>{
        expect(my_sectionCR(section)).toBeCloseTo(82720558.09)  
 })    
})