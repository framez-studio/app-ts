import {
	IElement,
	IRectangularRCSection,
	IRowReinforcement,
	IRowReinforcementMechanics,
} from '@interfaces'
import { absolutevalue } from './algebra'
import { Hinge } from '@classes/others/moment-curvature'

export const NominalMomentWhitney = (
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let c = NominalNeutralAxisWhitney(sectionCR, p) as number
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

export const NominalNeutralAxisWhitney = (
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let cu = sectionCR.h * 10
	let ci = 0.001
	let itmax = 200e6
	let tol = 1e-9
	try {
		let c = BiseccionMethod(
			WhitneyEquilibriumForces,
			ci,
			cu,
			itmax,
			tol,
			sectionCR,
			p,
		)
		return c
	} catch (error) {
		throw error
	}
}

export const YieldNeutralAxis = (
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let cu = sectionCR.h * 10
	let ci = 0.001
	let itmax = 200
	let tol = 1e-9
	try {
		let c = BiseccionMethod(
			YieldEquilibriumForces,
			ci,
			cu,
			itmax,
			tol,
			sectionCR,
			p,
		)
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
	let rowr = ForcesAndMomentInReinforcement(
		ci,
		epsilon_cncr,
		sectionCR.reinforcement,
	)
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
	let rowr = ForcesAndMomentInReinforcement(
		ci,
		epsilon_cncr,
		sectionCR.reinforcement,
	)
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
	let rowr = ForcesAndMomentInReinforcement(
		ci,
		epsilon_cncr,
		sectionCR.reinforcement,
	)
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
	let rowr = ForcesAndMomentInReinforcement(
		ci,
		epsilon_cncr,
		sectionCR.reinforcement,
	)
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

export const ForcesAndMomentInReinforcement = (
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

export const BiseccionMethod = (
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
	return epsilon / c
}

const YieldDistanceTensionReinforcement = (
	sectionRC: IRectangularRCSection,
	p: number = 0,
) => {
	let c = YieldNeutralAxis(sectionRC, p)
	let row = ForcesAndMomentInReinforcement(
		c,
		sectionRC.material.epsilon_max,
		sectionRC.reinforcement,
	)
	let sumAS = 0
	let sumDAS = 0
	row.forEach((r) => {
		if (r.force > 0) {
			sumAS = sumAS + r.section.area
			sumDAS = sumDAS + r.section.area * r.distance
		}
	})
	return sumDAS / sumAS
}

const AreaMomentCurvature = (
	mn: number,
	cn: number,
	my: number,
	cy: number,
) => {
	return my * cy * 0.5 + (my + mn) * 0.5 * (cn - cy)
}

const CurvatureFinal = (
	NominalCurvature: number,
	SlopeMomentCurvatureElastic: number,
	CurveArea: number,
) => {
	let fun = (cx: number, cn: number, slope: number, area: number) => {
		let mx = cx * slope
		return absolutevalue(0.5 * (cx * mx) + mx * (cn - cx)) - area
	}

	let cx = BiseccionMethod(
		fun,
		1e-12,
		NominalCurvature,
		1e6,
		1e-6,
		NominalCurvature,
		SlopeMomentCurvatureElastic,
		CurveArea,
	)
	return cx
}

const MomentFinal = (
	CurvatureFinal: number,
	SlopeMomentCurvatureElastic: number,
) => {
	return CurvatureFinal * SlopeMomentCurvatureElastic
}

const WhitneyMomentCurvature2Section = (
	sectionRC: IRectangularRCSection,
	p: number,
) => {
	let YieldMoment = YieldMomentRectangularRC(sectionRC, p)
	let ccy = YieldNeutralAxis(sectionRC, p)
	let dy = YieldDistanceTensionReinforcement(sectionRC, p)
	let YieldCurvature = YieldCurvatureRC(
		ccy,
		dy,
		sectionRC.reinforcement[0].section.material.epsilonY,
	)
	let c = NominalNeutralAxisWhitney(sectionRC, p)
	let NominalMoment = NominalMomentWhitney(sectionRC, p)
	let NominalCurvature = NominalCurvatureWhitney(
		sectionRC.material.epsilon_max,
		c,
	)

	let Eslope = YieldMoment / YieldCurvature
	let AreaC = AreaMomentCurvature(
		NominalMoment,
		NominalCurvature,
		YieldMoment,
		YieldCurvature,
	)

	let cx = CurvatureFinal(NominalCurvature, Eslope, AreaC)
	let mx = MomentFinal(cx, Eslope)
	return { Curvature: cx, Moment: mx }
}

export const assignHinges2Element = (args: {
	element: IElement
	node: 'initial' | 'final' | 'both'
	hingeType: 'Moment-P' | 'Moment' | 'Custom'
	moment?: { max: number; min: number }
	curvature?: { max: number; min: number }
}) => {
	let { hingeType, element, node, moment, curvature } = args
	let MnMax = 0
	let MnMin = 0
	let CurvMax = 0
	let CurvMin = 0

	if (hingeType == 'Custom' && moment && curvature) {
		MnMax = moment.max
		MnMin = moment.min
		CurvMax = curvature.max
		CurvMin = curvature.min
	} else {
		let sectionRC = element.section
		let p = element.forces[0][0]
		hingeType = p == 0 ? 'Moment' : 'Moment-P'
		let mc1 = WhitneyMomentCurvature2Section(sectionRC, p)
		MnMax = mc1.Moment
		CurvMax = mc1.Curvature

		sectionRC.rotate180()

		let mc2 = WhitneyMomentCurvature2Section(sectionRC, p)
		MnMin = -mc2.Moment
		CurvMin = -mc2.Curvature

		sectionRC.rotate180()
	}

	if (node === 'initial' || node === 'both') {
		let hinge = new Hinge(MnMax, CurvMax, MnMin, CurvMin, hingeType)
		element.assignHinge('initial', hinge)
	}

	if (node == 'final' || node === 'both') {
		let hinge = new Hinge(MnMax, CurvMax, MnMin, CurvMin, hingeType)
		element.assignHinge('final', hinge)
	}
	// console.log('hinge assigned', { MnMax, CurvMax, MnMin, CurvMin, hingeType })
}

export const MomentCurvatureFinal2Section = (
	sectionRC: IRectangularRCSection,
) => {
	let mc1 = WhitneyMomentCurvature2Section(sectionRC, 0)
	sectionRC.rotate180()
	let mc2 = WhitneyMomentCurvature2Section(sectionRC, 0)
	return {
		maxMoment: mc1.Moment,
		maxCurv: mc1.Curvature,
		minMoment: -mc2.Moment,
		minCurve: -mc2.Curvature,
	}
}
