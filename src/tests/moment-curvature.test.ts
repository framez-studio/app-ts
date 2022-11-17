import { RectangularSectionCR } from "@/entities/classes";
import { BarNo6 } from "@/utils/bar-cr";
import { Concrete21 } from "@/utils/material";
import { c_whitney, mn_whitney } from "@/utils/moment-curvature";
import { describe, it, expect } from "vitest";

describe('description', () => {
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
