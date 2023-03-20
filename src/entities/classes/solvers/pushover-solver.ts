import { IElement, INode, IStructure } from '@interfaces'
import { coordinates2D, initialOrFinal, stepPushover } from '@types'
import { min } from 'mathjs'
import { Hinge } from '../others/moment-curvature'
import { StaticSolver } from './static-solver'

export class PushoverSolver {
	private static _statusAnalysis: boolean = false
	private static _steps: stepPushover[]
	private static _serviceSteps: stepPushover[]

	constructor() {}

	public static statusAnalysis() {
		return this._statusAnalysis
	}

	public analysisInitialState() {}

	private static pushByService(
		structure: IStructure,
		nodeObjCoordinates: coordinates2D,
		serviceLoad: number,
		actualForce: number,
		stepNumber: number,
	) {
		let nodeObj: INode
		let cfactors = collapseFactorStructure(structure)
		let cfValues = cfactors!.map((row) => row[2])
		let cfStep = min(...cfValues)
		let i = cfValues.indexOf(cfStep)
		let plasticizedNode: coordinates2D | null
		if (cfStep + actualForce > serviceLoad) {
			cfStep = serviceLoad - actualForce
			plasticizedNode = null
		} else {
			plasticizedNode =
				cfactors![i][1] == 'initial'
					? cfactors![i][0].nodes.initial.coordinates('static')
					: cfactors![i][0].nodes.final.coordinates('static')
			//se collapsa el elemento en el nodo releseado
			cfactors![i][0].release(cfactors![i][1], 'rz')
		}
		updateHingesStructure(structure, cfStep)
		try {
			nodeObj = structure.node(nodeObjCoordinates)
			//se registran los valores de interes en el paso j
		} catch (error) {
			throw 'ERROR: Pushover Solver cant find node obj'
		}
		let delta = nodeObj.displacements.dx
		let stepj = {
			step: 0,
			plasticizedNode:
				plasticizedNode == undefined ? plasticizedNode : null,
			collapseFactor: cfStep,
			dxAtControlNode: delta,
		}

		if (this._serviceSteps == undefined || this._serviceSteps.length == 0) {
			this._serviceSteps = [stepj]
		} else {
			this._serviceSteps.push(stepj)
		}
	}

	private static pushByStability(
		structure: IStructure,
		nodeObjCoordinates: coordinates2D,
		stepNumber: number,
	) {
		let nodeObj: INode
		let cfactors = collapseFactorStructure(structure)
		let cfValues = cfactors!.map((row) => row[2])
		let cfStep = min(...cfValues)
		let i = cfValues.indexOf(cfStep)
		let plasticizedNode: coordinates2D | null
		plasticizedNode =
			cfactors![i][1] == 'initial'
				? cfactors![i][0].nodes.initial.coordinates('static')
				: cfactors![i][0].nodes.final.coordinates('static')
		//se collapsa el elemento en el nodo releseado
		cfactors![i][0].release(cfactors![i][1], 'rz')
		updateHingesStructure(structure, cfStep)
		try {
			nodeObj = structure.node(nodeObjCoordinates)
			//se registran los valores de interes en el paso j
		} catch (error) {
			throw 'ERROR: Pushover Solver cant find node obj'
		}
		let delta = nodeObj.displacements.dx
		let stepj = {
			step: stepNumber,
			plasticizedNode:
				plasticizedNode == undefined ? plasticizedNode : null,
			collapseFactor: cfStep,
			dxAtControlNode: delta,
		}

		if (this._steps == undefined || this._steps.length == 0) {
			this._steps = [stepj]
		} else {
			this._steps.push(stepj)
		}
	}

	public static Run(
		structure: IStructure,
		nodeObjCoordinates: coordinates2D,
		stopCriteria: 'stability' | 'service',
		serviceLoad?: number,
	) {
		if (StaticSolver.isStable(structure)) {
		} else {
			throw 'ERROR! PushoverSolver can not resolve an unestable structure'
		}
		let j = 0
		let nodeObj: INode
		if (stopCriteria == 'service' && serviceLoad == undefined) {
			throw 'ERROR: cant run pushover analysis by service without a service load'
		}
		while (!stopAnalysis(structure, stopCriteria, serviceLoad)) {
			structure.displacements
			if (stopCriteria == 'service' && serviceLoad != undefined) {
				let actualForce =
					this._serviceSteps == undefined ? 0 : this.actualForce()
				this.pushByService(
					structure,
					nodeObjCoordinates,
					serviceLoad,
					actualForce,
					j,
				)
			} else {
				this.pushByStability(structure, nodeObjCoordinates, j)
			}
			j = j + 1
		}
	}

	public static serviceCapacityCurve() {
		let curve: number[][] = [[0, 0]]
		let shearForce = 0
		let dx = 0
		if (this._serviceSteps == undefined) {
			return [[0, 0]]
		}
		for (let i = 0; i < this._serviceSteps.length; i++) {
			const ei = this._serviceSteps[i]
			dx = dx + ei.dxAtControlNode * ei.collapseFactor * 1000 //1000x para obtener resultados en mm
			shearForce = shearForce + ei.collapseFactor
			curve.push([dx, shearForce])
		}

		return curve
	}

	public static capacityCurve() {
		let curve: number[][] = [[0, 0]]
		let shearForce = 0
		let dx = 0
		for (let i = 0; i < this._steps.length; i++) {
			const ei = this._steps[i]
			dx = dx + ei.dxAtControlNode * ei.collapseFactor * 1000 //1000x para obtener resultados en mm
			shearForce = shearForce + ei.collapseFactor
			curve.push([dx, shearForce])
		}
		return curve
	}

	public static actualForce() {
		return this.capacityCurve()[this.capacityCurve().length - 1][0]
	}

	public static reset() {
		this._serviceSteps = []
		this._steps = []
		this._statusAnalysis = false
	}
}

const collapseFactor = (moment: number, hinge: Hinge) => {
	if (moment != 0 && !hinge.isCollapsed) {
		let hingeMoment = hinge.moment
		let failMoment = moment >= 0 ? hinge.maxMoment : hinge.minMoment
		let residualMoment: number
		if (hingeMoment == 0) {
			residualMoment = failMoment
		} else {
			residualMoment = failMoment - hingeMoment
		}
		return residualMoment / moment
	} else {
		return undefined
	}
}

const collapseFactorElement = (
	element: IElement,
	node: initialOrFinal,
	moment: number,
) => {
	let hinge = element.getHinge(node)
	if (hinge != undefined) {
		return collapseFactor(moment, hinge)
	} else {
		return undefined
	}
}

const collapseFactorStructure = (structure: IStructure) => {
	let cfactors: [[IElement, initialOrFinal, number]] | undefined
	structure.elements.forEach((element) => {
		let mi = element.forces[2][0]
		let mf = element.forces[5][0]
		let cfi = collapseFactorElement(element, 'initial', mi)
		let cff = collapseFactorElement(element, 'final', mf)
		if (cfi != undefined) {
			if (cfactors != undefined) {
				cfactors.push([element, 'initial', cfi])
			} else {
				cfactors = [[element, 'initial', cfi]]
			}
		}
		if (cff != undefined) {
			if (cfactors != undefined) {
				cfactors.push([element, 'final', cff])
			} else {
				cfactors = [[element, 'final', cff]]
			}
		}
	})
	return cfactors
}

const updateHingesStructure = (
	structure: IStructure,
	collapseFactor: number,
) => {
	structure.elements.forEach((element) => {
		if (element.finalHinge != undefined) {
			element.finalHinge.moment =
				element.finalHinge.moment +
				element.forces[5][0] * collapseFactor
		}
		if (element.initialHinge != undefined) {
			element.initialHinge.moment =
				element.initialHinge.moment +
				element.forces[2][0] * collapseFactor
		}
	})
}

const totalSpanLoadStructure = (structure: IStructure) => {
	let totalSpanLoad = 0
	structure.elements.forEach((element) => {
		let elementSpanLoad = 0
		element.loads.forEach((load) => {
			elementSpanLoad = elementSpanLoad + load.load
		})
		totalSpanLoad = totalSpanLoad + elementSpanLoad
	})
	return totalSpanLoad
}

export const normalizeLoads2Unit = (
	structure: IStructure,
	normalizer: number,
) => {
	structure.elements.forEach((element) => {
		element.loads.forEach((load) => {
			load.load = load.load / normalizer
		})
	})
}

const isInStatusService = (totalLoadService: number) => {
	let cCurve = PushoverSolver.serviceCapacityCurve()
	let force = cCurve[cCurve.length - 1][1]
	return force == totalLoadService
}

const stopAnalysis = (
	structure: IStructure,
	stopCriteria: 'stability' | 'service',
	totalLoadService?: number,
) => {
	if (stopCriteria == 'stability') {
		return !StaticSolver.isStable(structure)
	}
	if (stopCriteria == 'service' && totalLoadService != undefined) {
		return isInStatusService(totalLoadService)
	} else {
		throw 'ERROR: Solver Pushover StopCriteria'
	}
}
