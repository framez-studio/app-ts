import { RectangularSectionCR } from "@/entities/classes";
import { BarNo6 } from "@/utils/bar-cr";
import { Concrete21 } from "@/utils/material";
import { cy, c_whitney, mn_whitney, my_sectionCR } from "@/utils/moment-curvature";
import { describe, it, expect } from "vitest";

describe('Nominal moment RSCR', () => {
    let section = new RectangularSectionCR(400,400,Concrete21)
    section.add_rr(60,4,BarNo6)
    section.add_rr(240,4,BarNo6)

    it('should calculate correctly} c whitney',()=>{
        expect(c_whitney(section)).toBeCloseTo(65.68)
    })
    it('should calculate correctly nominal moment',()=>{
        expect(mn_whitney(section)).toBeCloseTo( 98671347.18)  
    })
    
})

describe('Yield moment RSCR', () => {
    let section = new RectangularSectionCR(400,400,Concrete21)
    section.add_rr(60,4,BarNo6)
    section.add_rr(240,4,BarNo6)

    it('should calculate correctly} c yield',()=>{
        expect(cy(section)).toBeCloseTo(83.656615)
    })
    it('should calculate correctly yield moment',()=>{
        expect(my_sectionCR(section)).toBeCloseTo(98885582.52)  
    })
    
})