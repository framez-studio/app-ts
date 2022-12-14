import {
	elementDegsOfFreedom2DObject,
	initialFinal,
	nodeLoads2DObject,
} from '@types'

export const reactions2DObject = (
	fxi: number,
	fyi: number,
	mzi: number,
	fxf: number,
	fyf: number,
	mzf: number,
): initialFinal<nodeLoads2DObject> => {
	return {
		initial: {
			fx: fxi,
			fy: fyi,
			mz: mzi,
		},
		final: {
			fx: fxf,
			fy: fyf,
			mz: mzf,
		},
	}
}
export const rectangularLoadFef = (
	w: number,
	l: number,
	a: number,
	b: number,
	releases: elementDegsOfFreedom2DObject,
): initialFinal<nodeLoads2DObject> => {
	// composite vars
	let wa4 = w * a ** 4
	let wb4 = w * b ** 4
	let l2 = l ** 2
	let l3 = l2 * l
	let l2wa2 = l2 * w * a ** 2
	let l2wb2 = l2 * w * b ** 2
	let lwa3 = l * w * a ** 3
	let lwb3 = l * w * b ** 3
	// moment resultants
	const m1 =
		-(3 * wa4 - 3 * wb4 + 6 * l2wa2 - 6 * l2wb2 - 8 * lwa3 + 8 * lwb3) /
		(12 * l2)
	const m2 = -(3 * wa4 - 3 * wb4 - 4 * lwa3 + 4 * lwb3) / (12 * l2)
	// force resultants
	const fy1 =
		-(wa4 - wb4 - 2 * lwa3 + 2 * l3 * w * a + 2 * lwb3 - 2 * l3 * w * b) /
		(2 * l3)
	const fy2 = (wa4 - wb4 - 2 * lwa3 + 2 * lwb3) / (2 * l3)
	// reactions object
	const reactions = reactions2DObject(0, fy1, m1, 0, fy2, m2)
	// releases
	if (releases.initial.rz && releases.final.rz) {
		reactions.initial.fy -= (m1 + m2) / l
		reactions.initial.mz = 0
		reactions.final.fy += (m1 + m2) / l
		reactions.final.mz = 0
	} else if (releases.initial.rz) {
		reactions.initial.fy -= (3 * m1) / (2 * l)
		reactions.initial.mz = 0
		reactions.final.fy += (3 * m1) / (2 * l)
		reactions.final.mz -= m1 / 2
	} else if (releases.final.rz) {
		reactions.initial.fy -= (3 * m2) / (2 * l)
		reactions.initial.mz -= m2 / 2
		reactions.final.fy += (3 * m2) / (2 * l)
		reactions.final.mz = 0
	}
	// reactions
	return reactions
}
export const punctualLoadFef = (
	w: number,
	l: number,
	a: number,
): initialFinal<nodeLoads2DObject> => {
	console.warn(`The punctual span load doesnt support member releases yet!!`)
	// composite vars
	let l2 = l ** 2
	let l3 = l * l2
	// moment resultants
	let m1 = (w * a * (l - a) ** 2) / l2
	let m2 = -(w * a ** 2 * (l - a)) / l2
	// force resultants
	let fy1 = (w * (l - a) ** 2 * (l + 2 * a)) / l3
	let fy2 = (w * a ** 2 * (3 * l - 2 * a)) / l3
	// reactions
	return reactions2DObject(0, fy1, m1, 0, fy2, m2)
}
