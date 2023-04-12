import { coordinates2D, supportType } from '@types'
import { ElementNode } from '@classes/nodes/element-node'
import { constraints } from '@config/globals'

export class Support extends ElementNode{
	private type: supportType
	constructor(type: supportType, coordinates: coordinates2D) {
		super(coordinates)
		this.type = type
		this.constraints = { ...constraints[type] }
	}

	copy(){
		return new Support(this.type,this.coordinates('static'))
	}
}
