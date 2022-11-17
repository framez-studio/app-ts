import { IRectangularSectionCR, RowReinforcement, RowReinforcementMechanics } from "@/entities/interfaces/section.interface";
import { absolutevalue } from "./algebra";
import { epsilonmax_cnrc } from "./material";


export const mn_whitney = (sectionCR: IRectangularSectionCR, p: number = 0) => {
    let c = c_whitney(sectionCR,p) as number
    return eq_moment(c,sectionCR,p)
}

export const c_whitney = (sectionCR: IRectangularSectionCR, p: number = 0) => {
    let cu = sectionCR.b
    let ci = 0.1
    let itmax = 100
    try {
        let c = biseccion(eq_forces,ci,cu,itmax,1e-9,sectionCR,p)
        return c
    } catch (error) {
        return error
    }
}

const fun_a = (ci: number, beta:number):number => {return ci*beta}

const FMReinforcement = (ci:number, reinforcement: RowReinforcement[])=>{
    let r: RowReinforcementMechanics[] = []
    reinforcement.forEach(rowi => {
            let i = rowi as RowReinforcementMechanics
            i.epsilon = epsilonmax_cnrc * (-ci+i.distance) / ci
            i.strength = 
            ((i.section.fy/i.section.young)>absolutevalue(i.epsilon)) ? 
            i.epsilon * i.section.young : i.section.fy

            i.force = i.strength * i.section.area * i.quantity
            i.moment = i.force * i.distance
            r.push(i)
        });
    return r
}

const eq_forces = (ci: number, SectionCR: IRectangularSectionCR, P: number = 0)=>{
    let a = fun_a(ci,SectionCR.material.beta)
    let force_cncr = 0.85 * a * SectionCR.material.fc * SectionCR.b
    let rowr = FMReinforcement(ci,SectionCR.reinforcement)
    let forceT = 0
    let forceC = -force_cncr-P
    rowr.forEach(element => {
        if (element.distance>ci) {
            forceT = forceT + element.force
        }
        if (element.distance<ci) {
            forceC = forceC + element.force
        }
    });
    return forceT+forceC
}

const eq_moment = (ci: number, SectionCR: IRectangularSectionCR, P: number = 0)=>{
    let a = fun_a(ci,SectionCR.material.beta)
    let moment_cncr = 0.85 * a * SectionCR.material.fc * SectionCR.b * a * 0.5
    let rowr = FMReinforcement(ci,SectionCR.reinforcement)
    let momentT = 0
    let momentC = -moment_cncr-P
    rowr.forEach(element => {
        if (element.distance>ci) {
            momentT = momentT + element.moment
        }
        if (element.distance<ci) {
            momentC = momentC + element.moment
        }
    });
    return momentT+momentC
}

const biseccion = (
    fun: Function, 
    xi:number, 
    xu:number, 
    itmax:number, 
    tol:number,
    ...args: any) =>{
    let xii = xi
    let xuu = xu
    let yi  =fun(xii,...args)
    let yu = fun(xuu,...args)
    let xr = 0
    let yr = 0
    let iter = 0
    if (yi*yu>0) {
        throw 'Not Found: Neutral Axis'
    }else{
        while (iter < itmax) {
            iter++
            xr = 0.5*(xii+xuu)
            yr = fun(xr,...args)
            if (yi*yr<0) {
                xuu = xr
                yu = yr
            } else {
                xii = xr
                yi=yr
            }
            if (0.5*absolutevalue(xii-xuu)<=tol) {break}
        }
    }
    if (iter == itmax) {throw 'Not Found: Neutral Axis'} else {return xr}
    
}

1098824080