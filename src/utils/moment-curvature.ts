import {
	IRectangularRCSection,
	IRowReinforcement,
	IRowReinforcementMechanics,
} from '@interfaces'
import { absolutevalue } from './algebra'

export const mn_whitney = (sectionCR: IRectangularRCSection, p: number = 0) => {
	let c = c_whitney(sectionCR, p) as number
	return eq_moment_whitney(c, sectionCR, p)
}

export const curv_mn = (c: number, epsilon: number) => {
	return epsilon / c
}

export const my_sectionCR = (
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let c = cy(sectionCR, p) as number
	return eq_moment_my(c, sectionCR, p)
}

export const curv_my = (c: number, d: number, epsilon: number) => {
	return epsilon / (d - c)
}

export const c_whitney = (sectionCR: IRectangularRCSection, p: number = 0) => {
	let cu = sectionCR.b
	let ci = 0.001
	let itmax = 200
	let tol = 1e-9
	try {
		let c = biseccion(eq_forces_whitney, ci, cu, itmax, tol, sectionCR, p)
		return c
	} catch (error) {
		return error
	}
}

export const cy = (sectionCR: IRectangularRCSection, p: number = 0) => {
	let cu = sectionCR.b
	let ci = 0.001
	let itmax = 200
	let tol = 1e-9
	try {
		let c = biseccion(eq_forces_my, ci, cu, itmax, tol, sectionCR, p)
		return c
	} catch (error) {
		return error
	}
}

const fun_a = (ci: number, beta: number): number => {
	return ci * beta
}

const eq_forces_whitney = (
	ci: number,
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let a = fun_a(ci, sectionCR.material.beta)
	let epsilon_cncr = sectionCR.material.epsilon_max
	let force_cncr = force_whitney(a, sectionCR.material.fc, sectionCR.b)
	let rowr = FMR_Reinforcement(ci, epsilon_cncr, sectionCR.reinforcement)
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

const eq_moment_whitney = (
	ci: number,
	sectionCR: IRectangularRCSection,
	p: number = 0,
) => {
	let a = fun_a(ci, sectionCR.material.beta)
	let epsilon_cncr = sectionCR.material.epsilon_max
	let moment_cncr =
		force_whitney(a, sectionCR.material.fc, sectionCR.b) * a * 0.5
	let rowr = FMR_Reinforcement(ci, epsilon_cncr, sectionCR.reinforcement)
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

const eq_forces_my = (
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
	let rowr = FMR_Reinforcement(ci, epsilon_cncr, sectionCR.reinforcement)
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

const eq_moment_my = (
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
	let rowr = FMR_Reinforcement(ci, epsilon_cncr, sectionCR.reinforcement)
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

const FMR_Reinforcement = (
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

const force_whitney = (a: number, fc: number, b: number) => {
	return 0.85 * a * fc * b
}

const biseccion = (
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
		throw 'Not Found: Neutral Axis'
	} else {
		return xr
	}
}
