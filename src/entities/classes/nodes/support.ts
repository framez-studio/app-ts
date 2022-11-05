import { supportType } from '@types'
import { constraints } from '@config'
import { ElementNode } from '@classes'

export class Support extends ElementNode {
	constructor(type: supportType, x: number, y: number) {
		super(x, y)
		this.constraints = constraints[type]
	}
}
