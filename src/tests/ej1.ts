import { SMatrix } from '../entities/classes/sMatrix'
import { algebra as alg } from '../utils/algebra'
import { correction, transformation } from '../utils/matrices'
// data
let w = 12 // kN/m
const e = [(2 * 10) ^ 8, (2 * 10) ^ 8, (2 * 10) ^ 8] // kN/m2
const l = [3, 4, 3] // m
const a = [7.84, 7.84, 7.84] // m2
const i = [
	(1.26 * 10) ^ -6,
	(1.26 * 10) ^ -6,
	(1.26 * 10) ^ -6,
	(1.26 * 10) ^ -6,
] // m4
const fixFact = [
	[1, 1],
	[1, 1],
	[1, 1],
] // dimensionless
const angs = [90, 0, -90]
const po = [
	0,
	0,
	0,
	0,
	(w * l[1]) / 2,
	(-w * l[1] ** 2) / 12,
	0,
	(w * l[1]) / 2,
	(-w * l[1] ** 2) / 12,
	0,
	0,
	0,
] // kN
const p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //kN

// elements
let node = 0
const elements = e.map((ei, index) => {
	let si = new SMatrix(ei, l[index], a[index], i[index])
	let ci = correction(l[index], fixFact[index][0], fixFact[index][0])
	let ui = transformation(angs[index])
	let element = {
		inode: node,
		fnode: ++node,
		s: si.full().data,
		c: ci,
		u: ui,
	}
	element.k = alg.multiply(element.s, element.c)
	return element
})

// global matrix assembly
let k = alg.zeros([(node + 1) * 3, (node + 1) * 3])
let c = alg.zeros([(node + 1) * 3, (node + 1) * 3])
let u = alg.zeros([(node + 1) * 3, (node + 1) * 3])

elements.forEach((elm) => {
	// let m1 = alg.multiply(alg.multiply(elm.s, elm.c), elm.u)
	// let m2 = alg.multiply(alg.transpose(elm.u), m1)
	let range = alg.index(
		alg.range(elm.inode * 3, elm.inode * 3 + 6),
		alg.range(elm.inode * 3, elm.inode * 3 + 6),
	)

	let kSubmatrix = alg.add(alg.subset(k, range), elm.k)

	k = alg.subset(k, range, kSubmatrix)
})

console.log(k)
// problem solving
