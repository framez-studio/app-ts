import { IElement, INode, IStructure } from '@interfaces'
import { coordinates2D, initialOrFinal, stepPushover } from '@types'
import { min } from 'mathjs'
import { Hinge } from '../others/moment-curvature'
import { StaticSolver } from './static-solver'
import { RoundFloor } from '@utils/algebra'

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
		let stepj: stepPushover
		if (cfStep + actualForce > serviceLoad) {
			cfStep = serviceLoad - actualForce
			plasticizedNode = null
			updateHingesStructure(structure, cfStep)
		} else {
			plasticizedNode =
				cfactors![i][1] == 'initial'
					? cfactors![i][0].nodes.initial.coordinates('static')
					: cfactors![i][0].nodes.final.coordinates('static')
			//se collapsa el elemento en el nodo releseado
			updateHingesStructure(structure, cfStep)
			cfactors!.forEach((rowc) => {
				if (RoundFloor(rowc[2], 9) == RoundFloor(cfStep, 9)) {
					rowc[0].release(rowc[1], 'rz')
				}
			})
		}

		try {
			nodeObj = structure.node(nodeObjCoordinates)
			//se registran los valores de interes en el paso j
		} catch (error) {
			throw 'ERROR: Pushover Solver cant find node obj'
		}
		let delta = nodeObj.displacements.dx
		stepj = {
			step: 0,
			plasticizedNode:
				plasticizedNode == undefined ? null : plasticizedNode,
			collapseFactor: cfStep,
			dxAtControlNode: delta,
		}

		if (this._serviceSteps == undefined || this._serviceSteps.length == 0) {
			this._serviceSteps = [stepj!]
		} else {
			this._serviceSteps.push(stepj!)
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

		updateHingesStructure(structure, cfStep)
		//updateHingesStructure(structureService,cfStep)
		cfactors!.forEach((rowc) => {
			if (rowc[2] == cfStep) {
				rowc[0].release(rowc[1], 'rz')
			}
		})
		//structureService.element(cfactors![i][0].nodes.initial.coordinates('static'),cfactors![i][0].nodes.final.coordinates('static')).release(cfactors![i][1],'rz')

		try {
			nodeObj = structure.node(nodeObjCoordinates)
			//se registran los valores de interes en el paso j
		} catch (error) {
			throw 'ERROR: Pushover Solver cant find node obj'
		}
		//let delta = (structureService.node(nodeObj.coordinates('static'))).displacements.dx
		let delta = nodeObj.displacements.dx
		let stepj = {
			step: stepNumber,
			plasticizedNode:
				plasticizedNode == undefined ? null : plasticizedNode,
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
		//let structureService = structure.copy()
		//unReleaseInverseHingesFromService(structureService)
		let timeinicio = Date.now()
		let timeActual = 0
		let timeAnterior = 0
		while (!stopAnalysis(structure, stopCriteria, serviceLoad)) {
			try {
				structure.displacements
			} catch (error) {
				break
			}
			//structureService.displacements
			timeAnterior = timeActual
			timeActual = Date.now()-timeinicio
			let timeStep = (timeActual-timeAnterior)/1000
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
				unReleaseInverseHingesFromService(structure)
				structure.displacements
				//if (j==0) {structure.unReleaseAll()}
				try {
					//this.pushByStability(structure, nodeObjCoordinates, j,structureService)
					this.pushByStability(structure, nodeObjCoordinates, j)
				} catch (error) {
					break
				}
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
			dx = dx + ei.dxAtControlNode * ei.collapseFactor //1000x para obtener resultados en mm xd
			shearForce = shearForce + ei.collapseFactor
			curve.push([dx, shearForce])
		}

		return curve
	}

	public static capacityCurve() {
		let serviceStep =
			this.serviceCapacityCurve()[
				this.serviceCapacityCurve().length - 1
			][0]
		let curve: number[][] = [
			[0, 0],
			[serviceStep, 0],
		]
		let shearForce = 0
		let dx = serviceStep
		for (let i = 0; i < this._steps.length; i++) {
			const ei = this._steps[i]
			dx = dx + ei.dxAtControlNode * ei.collapseFactor //1000x para obtener resultados en mm xdd
			shearForce = shearForce + ei.collapseFactor
			curve.push([dx, shearForce])
		}
		return curve
	}

	public static actualForce() {
		return this.serviceCapacityCurve()[
			this.serviceCapacityCurve().length - 1
		][1]
	}

	public static reset() {
		this._serviceSteps = []
		this._steps = []
		this._statusAnalysis = false
	}
}

const unReleaseInverseHingesFromService = (strFromService: IStructure) => {
	let str2 = strFromService.copy()
	str2.unReleaseAll()
	str2.displacements
	strFromService.elements.forEach((eS) => {
		let e0 = str2.element(
			eS.nodes.initial.coordinates('static'),
			eS.nodes.final.coordinates('static'),
		)
		let hiS = eS.getHinge('initial')
		let miS = 0
		let hfS = eS.getHinge('final')
		let mfS = 0
		let hi0 = e0.getHinge('initial')
		let mi0 = 0
		let hf0 = e0.getHinge('final')
		let mf0 = 0
		if (hiS!=undefined && hiS.isCollapsed) {miS = hiS.moment}
		if (hfS!=undefined && hfS.isCollapsed) {mfS = hfS.moment}
		if (hi0!=undefined && hi0.isCollapsed) {mi0 = e0.forces[2][0]}
		if (hf0!=undefined && hf0.isCollapsed) {mf0 = e0.forces[5][0]}
		if (miS*mi0<0 && hiS!=undefined) {
			hiS.moment=hiS.moment-1e-6
			hiS.isCollapsed = false
			eS.unrelease('initial','rz')
			
		}
		if (mfS*mf0<0&& hfS!=undefined) {
			hfS.moment=hfS.moment-1e-6
			hfS.isCollapsed = false
			eS.unrelease('final','rz')
		}
	})
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
			let mf =
				element.finalHinge.moment +
				element.forces[5][0] * collapseFactor
			element.finalHinge.setMoment(mf)
		}
		if (element.initialHinge != undefined) {
			let mi =
				element.initialHinge.moment +
				element.forces[2][0] * collapseFactor
			element.initialHinge.setMoment(mi)
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
