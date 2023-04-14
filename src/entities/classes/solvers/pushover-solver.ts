import { IElement, IFrameSystem, INode, IStructure } from '@interfaces'
import { coordinates2D, initialOrFinal, stepPSequence, stepPushover } from '@types'
import { min } from 'mathjs'
import { Hinge } from '../others/moment-curvature'
import { StaticSolver } from './static-solver'
import { RoundFloor } from '@utils/algebra'
import { BiseccionMethod } from '@utils/moment-curvature'

export class PushoverSolver {
	private static _statusAnalysis: boolean = false
	private static _steps: stepPushover[]
	private static _serviceSteps: stepPushover[]
	private static _pSequence: stepPSequence[]

	constructor() {}

	public static statusAnalysis() {
		return this._statusAnalysis
	}

	public analysisInitialState() {}

	private static pushByService(
		structure: IFrameSystem,
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
			structure: copyStructureUpdateDelta(structure,cfStep)
		}

		if (this._serviceSteps == undefined || this._serviceSteps.length == 0) {
			this._serviceSteps = [stepj!]
		} else {
			this._serviceSteps.push(stepj!)
		}
	}

	private static pushByStability(
		structure: IFrameSystem,
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
			structure: copyStructureUpdateDelta(structure,cfStep)
		}

		if (this._steps == undefined || this._steps.length == 0) {
			this._steps = [stepj]
		} else {
			this._steps.push(stepj)
		}
	}

	public static Run(
		structure: IFrameSystem,
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
		let dxFromService =
			this.serviceCapacityCurve()[
				this.serviceCapacityCurve().length - 1
			][0]
		let curve: number[][] = [
			[dxFromService, 0],
		]
		let shearForce = 0
		let dx = dxFromService
		for (let i = 0; i < this._steps.length; i++) {
			const ei = this._steps[i]
			dx = dx + ei.dxAtControlNode * ei.collapseFactor //1000x para obtener resultados en mm xdd
			shearForce = shearForce + ei.collapseFactor
			if (dx<1e6) {
				curve.push([dx, shearForce])
			}else{break}
		}
		return curve
	}

	public static bilinearCapacityCurve(){
		let cc = this.capacityCurve()
		return bilinearizeCapacityCurve(cc)
	}



	public static updatePlasticizingSequence(){
		let steps = this._steps
		this._pSequence = []

		for (let i = 0; i < this._steps.length; i++) {
			const step = this._steps[i].step;
			let str2 =this._steps[i].structure.copy()
			for (let j = 0; j < i+1; j++) {
				const str1 = this._steps[j].structure;
				let cf = this._steps[j].collapseFactor
				str2.nodes.forEach(n2 => {
					let n1 = str1.node(n2.coordinates('static'))
					n2.addDisplacements({dx: n1.displacements.dx*cf,
						dy: n1.displacements.dy*cf,
						rz: n1.displacements.rz*cf,
					})
					n2.setReactions({fx: n2.reactions.fx +n1.reactions.fx*cf,
						fy: n2.reactions.fy +n1.reactions.fy*cf,
						mz: n2.reactions.mz +n1.reactions.mz*cf})
				});
			}
			let stepj = {step: step,structure: str2}
			if (this._pSequence == undefined || this._pSequence.length == 0) {
				this._pSequence = [stepj]
			} else {
				this._pSequence.push(stepj)
			}
		}
	}

	public static plasticizingSequence(){
		this.updatePlasticizingSequence()
		return this._pSequence
	}

	public static actualForce() {
		return this.serviceCapacityCurve()[
			this.serviceCapacityCurve().length - 1
		][1]
	}

	public static reset() {
		this._serviceSteps = []
		this._steps = []
		this._pSequence=[]
		this._statusAnalysis = false
	}
}

const bilinearizeCapacityCurve = (capacityCurve: number[][]) => {
	let area1 = areaCapacityCurve(capacityCurve)
	let d0 = capacityCurve[0][0]
	let v0 = capacityCurve[0][1]
	let dy1 = capacityCurve[1][0]
	let vy1 = capacityCurve[1][1]
	let du = capacityCurve[capacityCurve.length-1][0]
	let vu = capacityCurve[capacityCurve.length-1][1]
	let slopeY1 =(vy1-v0)/(dy1-d0)

	let dy06 = 0.6*dy1
	let vy06 = slopeY1*dy06

	let fun = (dy2: number,d0: number,v0: number,dy06: number,vy06: number,du: number,vu: number,area1: number) => {
		dy06 = d0+dy06
		let area2 = areaCapacityCurve([[d0,v0],[dy06,vy06],[dy2,vu],[du,vu]])
		return area1-area2
	}
	let dy2 = BiseccionMethod(fun,dy06+d0,du,1e9,1e-7,d0,v0,dy06,vy06,du,vu,area1)
	return [
		[d0,v0],
		[dy06,vy06],
		[dy2,vu],
		[du,vu]
	]
}

const areaCapacityCurve = (capacityCurve: number[][]) =>{
	let d0 = capacityCurve[0][0]
	let v0 = capacityCurve[0][1]
	let area = 0
	for (let i = 1; i < capacityCurve.length; i++) {
		let di = capacityCurve[i-1][0];
		let vi = capacityCurve[i-1][1];
		let di1 = capacityCurve[i][0];
		let vi1 = capacityCurve[i][1];
		area = area + 0.5*(vi*vi1)*(di1-di)
	}
	return area
}
const copyStructureUpdateDelta = (structure: IFrameSystem, cf: number) => {

	let str2 = structure.copy()
	structure.nodes.forEach(n => {
		let n2 = str2.node(n.coordinates('static'))
		n2.reset()
		n2.addDisplacements({dx: n.displacements.dx*cf,
			dy: n.displacements.dy*cf,
			rz: n.displacements.rz*cf,
		})
		n2.addLoads({fx: n.loads.fx*cf,fy: n.loads.fy*cf,mz: n.loads.mz*cf,})
		n2.setReactions({fx: n.reactions.fx*cf,fy: n.reactions.fy*cf,mz: n.reactions.mz*cf,})
	});
	return str2
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
