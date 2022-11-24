import { coordinates2D, supportType } from '@types'
import { constraints } from '@config'
import { ElementNode } from '@classes'

export class Support extends ElementNode {
	constructor(type: supportType, coordinates: coordinates2D) {
		super(coordinates)
		this.constraints = { ...constraints[type] }
	}
}
