import { IElement, INode, IFrameSystem } from '@interfaces'
import { supportType } from '@types'
import { ElementNode } from '../nodes/element-node'
import { Structure, findNodeinArrayByCoordinates } from './structure'
import { constraints } from '@config/globals'
import { uniques } from '@utils/helpers'

export class FrameSystem extends Structure implements IFrameSystem {
	//TODO: all
	/*constructor(
        _numberLevels: number,
        heightLevels: number,
        _numberSpans: number,
        distanceSpans: number,
        columnSection: Section,
        beamSection: Section,
        defaultSupport: supportType
    ){
        let a = new ElementNode({x: 0 ,y: 0})
        let b = new ElementNode({x: 0 ,y: heightLevels})
        let c = new ElementNode({x: distanceSpans ,y: 0})
        let d = new ElementNode({x: distanceSpans ,y: heightLevels})

        a.constraints = {...constraints[defaultSupport]}
        c.constraints = {...constraints[defaultSupport]}

        let coll = new Element(a,b,columnSection)
        let colr = new Element(c,d,columnSection)
        let vga = new Element(b,d,beamSection)
        super(coll,vga,colr)
    }*/

	constructor(...elements: IElement[]) {
		super(...elements)
	}

	get levels() {
		let all = this.nodes.map((node) => node.coordinates('static').y)
		return uniques(...all)
	}

	get numberLevels() {
		return this.levels.length
	}

	get spans() {
		let all = this.nodes.map((node) => node.coordinates('static').x)
		return uniques(...all)
	}

	get numberSpans() {
		return this.spans.length
	}

	public levelNodeMass(level: number) {
		let nodes = this.filterNodes((level = level))
		let mass = 0
		nodes.forEach((n) => {
			mass = n.nodeMass != undefined ? mass + n.nodeMass : mass
		})
		return mass
	}
	public copy(): IFrameSystem {
		let eArray = [] as IElement[]
		let nodesNew: INode[] = []
		this.nodes.forEach((n) => {
			nodesNew.push(n.copy())
		})

		this._elements.forEach((e) => {
			let ni = findNodeinArrayByCoordinates(
				e.nodes.initial.coordinates('static'),
				nodesNew,
			)
			let nf = findNodeinArrayByCoordinates(
				e.nodes.final.coordinates('static'),
				nodesNew,
			)
			eArray.push(e.copy(ni, nf))
		})
		return new FrameSystem(...eArray)
	}
}

const createNodes = (
	numberLevels: number,
	heightLevels: number,
	numberSpans: number,
	distanceSpans: number,
) => {
	let i = 0
	let j = 0
	let xi = 0
	let yi = 0
	let n = new ElementNode({ x: xi, y: yi })
	let nodes: INode[] = [n]
	xi = xi + distanceSpans
	while (i <= numberLevels) {
		while (j <= numberSpans) {
			n = new ElementNode({ x: xi, y: yi })
			nodes.push(n)
			xi = xi + distanceSpans
			j++
		}
		xi = 0
		yi = yi + heightLevels
		i++
	}
	return nodes
}

const constraintLevelNodes = (
	nodes: INode[],
	level: number,
	type: supportType = 'fixed',
) => {
	nodes.forEach((n) => {
		if (n.coordinates('static').y == level) {
			n.constraints = { ...constraints[type] }
		} else {
		}
	})
	return nodes
}

const createElements = (n: null) => {
	return null
}
