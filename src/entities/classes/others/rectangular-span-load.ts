import { elementLoads2DArray, elementLoads2DObject, initialFinal } from '@types'
import { IElement, ISpanLoad } from '@interfaces'
import { rectangularLoadFef } from '@utils/fefs'

// TODO: throw error if distance is greater than elementLength
export class RectangularSpanLoad implements ISpanLoad {
	public load: number
	private distance: initialFinal<number>
	private element: IElement

	constructor(
		element: IElement,
		load: number,
		initial: number = 0,
		final: number = element.length,
	) {
		this.element = element
		this.load = load
		this.distance = { initial, final }
		this.element.addSpanLoad(this)
	}
	get fef(): elementLoads2DObject {
		return rectangularLoadFef(
			this.load,
			this.element.length,
			this.distance.initial,
			this.distance.final,
			this.element.releases,
		)
	}
	get fefArray(): elementLoads2DArray {
		let fef = this.fef
		return [
			[fef.initial.fx],
			[fef.initial.fy],
			[fef.initial.mz],
			[fef.final.fx],
			[fef.final.fy],
			[fef.final.mz],
		]
	}  

	public copy(element: IElement): ISpanLoad{
		return new RectangularSpanLoad(element,this.load)
	}
}
