import {
	IElement,
	IRectangularRCSection,
	IRowReinforcement,
	IRowReinforcementMechanics,
} from '@interfaces'
import { absolutevalue } from './algebra'
import { Hinge } from '@classes/others/moment-curvature'

export const NominalMomentWhitney = (sectionCR: IRectangularRCSection, p: number = 0) => {
	let c = NeutralAxialWhitney(sectionCR, p) as number
	return WhitneyEquilibriumMoment(c, sectionCR, p)
}

export const CurvatureNominalMomentWhitney = (c: number, epsilon: number) => {
	return epsilon / c
}

export const YieldMomentRectangularRC = (
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let c = YieldNeutralAxis(sectionCR, p) as number
	return YieldEquilibriumMoment(c, sectionCR, p)
}

export const YieldCurvatureRC = (c: number, d: number, epsilon: number) => {
	return epsilon / (d - c)
}

export const NeutralAxialWhitney = (sectionCR: IRectangularRCSection, p: number = 0) => {
	let cu = sectionCR.b
	let ci = 0.001
	let itmax = 200
	let tol = 1e-9
	try {
		let c = BiseccionMethod(WhitneyEquilibriumForces, ci, cu, itmax, tol, sectionCR, p)
		return c
	} catch (error) {
		throw error
	}
}

export const YieldNeutralAxis = (sectionCR: IRectangularRCSection, p: number = 0) => {
	let cu = sectionCR.b
	let ci = 0.001
	let itmax = 200
	let tol = 1e-9
	try {
		let c = BiseccionMethod(YieldEquilibriumForces, ci, cu, itmax, tol, sectionCR, p)
		return c
	} catch (error) {
		throw 'Error: NeturalAxis can not find'
	}

}

const CoeficentAConcreteSection = (ci: number, beta: number): number => {
	return ci * beta
}

const WhitneyEquilibriumForces = (
	ci: number,
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let a = CoeficentAConcreteSection(ci, sectionCR.material.beta)
	let epsilon_cncr = sectionCR.material.epsilon_max
	let force_cncr = WhitneyForceConcrete(a, sectionCR.material.fc, sectionCR.b)
	let rowr = ForcesAndMomentInReinforcement(ci, epsilon_cncr, sectionCR.reinforcement)
	let forceT = 0
	let forceC = -force_cncr - p
	rowr.forEach((element) => {
		if (element.distance > ci) {
			forceT = forceT + element.force
		}
		if (element.distance < ci) {
			forceC = forceC + element.force
		}
	})
	return forceT + forceC
}

const WhitneyEquilibriumMoment = (
	ci: number,
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let a = CoeficentAConcreteSection(ci, sectionCR.material.beta)
	let epsilon_cncr = sectionCR.material.epsilon_max
	let moment_cncr =
		WhitneyForceConcrete(a, sectionCR.material.fc, sectionCR.b) * a * 0.5
	let rowr = ForcesAndMomentInReinforcement(ci, epsilon_cncr, sectionCR.reinforcement)
	let momentT = 0
	let momentC = -moment_cncr - p
	rowr.forEach((element) => {
		if (element.distance > ci) {
			momentT = momentT + element.moment
		}
		if (element.distance < ci) {
			momentC = momentC + element.moment
		}
	})
	return momentT + momentC
}

const YieldEquilibriumForces = (
	ci: number,
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let r = sectionCR.reinforcement.length - 1
	let epsilon_fy =
		sectionCR.reinforcement[r].section.fy /
		sectionCR.reinforcement[r].section.young
	let epsilon_cncr = absolutevalue(epsilon_fy * (ci / (sectionCR.dmax - ci)))
	let force_cncr =
		0.5 * (epsilon_cncr * sectionCR.material.young) * ci * sectionCR.b
	let rowr = ForcesAndMomentInReinforcement(ci, epsilon_cncr, sectionCR.reinforcement)
	let forceT = 0
	let forceC = -force_cncr - p
	rowr.forEach((element) => {
		if (element.distance > ci) {
			forceT = forceT + element.force
		}
		if (element.distance < ci) {
			forceC = forceC + element.force
		}
	})

	return forceT + forceC
}

const YieldEquilibriumMoment = (
	ci: number,
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let r = sectionCR.reinforcement.length - 1
	let epsilon_fy =
		sectionCR.reinforcement[r].section.fy /
		sectionCR.reinforcement[r].section.young
	let epsilon_cncr = absolutevalue(epsilon_fy * (ci / (sectionCR.dmax - ci)))
	let moment_cncr =
		0.5 *
		(epsilon_cncr * sectionCR.material.young) *
		ci *
		sectionCR.b *
		(1 / 3) *
		ci
	let rowr = ForcesAndMomentInReinforcement(ci, epsilon_cncr, sectionCR.reinforcement)
	let momentT = 0
	let momentC = -moment_cncr - p
	rowr.forEach((element) => {
		if (element.distance > ci) {
			momentT = momentT + element.moment
		}
		if (element.distance < ci) {
			momentC = momentC + element.moment
		}
	})
	return momentT + momentC
}

const ForcesAndMomentInReinforcement = (
	ci: number,
	epsilon_cncr: number,
	reinforcement: IRowReinforcement[],
) => {
	let r: IRowReinforcementMechanics[] = []
	reinforcement.forEach((rowi) => {
		let i = rowi as IRowReinforcementMechanics
		i.epsilon = (epsilon_cncr * (-ci + i.distance)) / ci
		i.strength =
			i.section.fy / i.section.young > absolutevalue(i.epsilon)
				? i.epsilon * i.section.young
				: i.section.fy

		i.force = i.strength * i.section.area * i.quantity
		i.moment = i.force * i.distance
		r.push(i)
	})
	return r
}

const WhitneyForceConcrete = (a: number, fc: number, b: number) => {
	return 0.85 * a * fc * b
}

const BiseccionMethod = (
	fun: Function,
	xi: number,
	xu: number,
	itmax: number,
	tol: number,
	...args: any
) => {
	let xii = xi
	let xuu = xu
	let yi = fun(xii, ...args)
	let yu = fun(xuu, ...args)
	let xr = 0
	let yr = 0
	let iter = 0
	if (yi * yu > 0) {
		throw 'Not Found: Neutral Axis'
	} else {
		while (iter < itmax) {
			iter++
			xr = 0.5 * (xii + xuu)
			yr = fun(xr, ...args)
			if (yi * yr < 0) {
				xuu = xr
				yu = yr
			} else {
				xii = xr
				yi = yr
			}
			if (0.5 * absolutevalue(xii - xuu) <= tol) {
				break
			}
		}
	}
	if (iter == itmax) {
		throw 'bisection method did not converge'
	} else {
		return xr
	}
}

const NominalCurvatureWhitney = (epsilon: number, c: number) => {
	return epsilon/c
}

const YieldDistanceTensionReinforcement = (sectionRC: IRectangularRCSection, p: number = 0) => {
	let c = YieldNeutralAxis(sectionRC,p)
	let row = ForcesAndMomentInReinforcement(c,sectionRC.material.epsilon_max,sectionRC.reinforcement)
	row.forEach(r => {
		row
	});
	return 0

}

const AreaMomentCurvature = (mn: number,cn: number,my: number,cy: number) => {
	return (my*cy*0.5)+((my+mn)*0.5*(cn-cy))
}

const CurvatureFinal = (NominalCurvature:number,SlopeMomentCurvatureElastic:number,CurveArea:number) => {
	let fun = (cx: number,cn:number,slope: number,area: number) => {
		let mx = cx*slope
		return (cx*mx)+(mx*(cn-cx))
	}

	let cx = BiseccionMethod(fun,0,NominalCurvature,1e6,1e-6,NominalCurvature,SlopeMomentCurvatureElastic,CurveArea)
	return cx
}

const MomentFinal = (CurvatureFinal: number,SlopeMomentCurvatureElastic:number) => {
	return CurvatureFinal*SlopeMomentCurvatureElastic
}


const WhitneyMomentCurvature2Section = (sectionRC: IRectangularRCSection, p: number) => {
	let YieldMoment = YieldMomentRectangularRC(sectionRC,p)
	let ccy = YieldNeutralAxis(sectionRC,p)
	let dy = YieldDistanceTensionReinforcement(sectionRC,p)
	let YieldCurvature = YieldCurvatureRC(ccy,dy,sectionRC.material.epsilon_max)
	let NominalMoment = NominalMomentWhitney(sectionRC,p)
	let c = NeutralAxialWhitney(sectionRC,p)
	let NominalCurvature = NominalCurvatureWhitney(sectionRC.material.epsilon_max,c)

	let Eslope = YieldMoment/YieldCurvature
	let AreaC = AreaMomentCurvature(NominalMoment,NominalCurvature,YieldMoment,YieldCurvature)

	let cx = CurvatureFinal(NominalCurvature,Eslope,AreaC)
	let mx = MomentFinal(cx,Eslope)
	return {Curvature: cx, Moment: mx}
}

const AsignHinges2Element = (
	element: IElement,
	node: 'initial'|'final'|'both',
	custom: boolean = false,
	NominalMaxMoment?: number,
	NominalMinMoment?: number
	) =>{
		let MnMax = 0
		let MnMin = 0
		let CurvMax = 0
		let CurvMin = 0
		let typeHinge: "Moment-P" | "Moment" | 'Custom' = 'Custom'


		if (custom && NominalMaxMoment!=undefined && NominalMinMoment != undefined) {
			MnMax = NominalMaxMoment
			MnMin = NominalMinMoment
		} else {
			let sectionRC = element.section
			let p = element.forces[0][0]
			typeHinge = p==0 ? 'Moment' : 'Moment-P'
			let mc1 = WhitneyMomentCurvature2Section(sectionRC,p)
			MnMax = mc1.Moment
			CurvMax = mc1.Curvature

			sectionRC.rotate180()

			let mc2 = WhitneyMomentCurvature2Section(sectionRC,p)
			MnMin = mc2.Moment
			CurvMin = mc2.Curvature

			sectionRC.rotate180()
		}

		if (node == 'initial' || 'both') {
			let hinge = new Hinge(MnMax,CurvMax,MnMin,CurvMin,typeHinge)
			element.assignHinge('initial',hinge)
		}

		if (node == 'final' || 'both') {
			let hinge = new Hinge(MnMax,CurvMax,MnMin,CurvMin,typeHinge)
			element.assignHinge('initial',hinge)
		}
}
