import { coordinates2D, supportType } from '@types'
import { ElementNode } from '@classes/nodes/element-node'
import { constraints } from '@config/globals'

export class Support extends ElementNode {
	constructor(type: supportType, coordinates: coordinates2D) {
		super(coordinates)
		this.constraints = { ...constraints[type] }
	}
}
