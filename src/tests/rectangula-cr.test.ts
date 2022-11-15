import { RectangularSectionCR } from "@/entities/classes";
import { BarNo4 } from "@/utils/bar-cr";
import { Concrete21 } from "@/utils/material";
import { sec } from "mathjs";
import { describe, it, expect } from "vitest";

describe('description', () => {
    const section = new RectangularSectionCR(300,400,Concrete21)
    section.add_rr(240,4,BarNo4)
    section.add_rr(40,4,BarNo4)
    section.add_rr(100,4,BarNo4)
    section.add_rr(60,4,BarNo4)
    section.sort_reinforcement()
    const i = section.reinforcement.length
    it('should sort correctly reinforcement',()=>{
        expect(section.reinforcement[0].distance).toBeCloseTo(40)
        expect(section.reinforcement[i-1].distance).toBeCloseTo(240)
    })

    it('should calculate correctly As',()=>{
        expect(section.as()).toBeCloseTo(2064)
        expect(section.as(40)).toBeCloseTo(516)
    })
})