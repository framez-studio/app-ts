import { constraints } from '../../../config/globals'
import { supportType } from '../../types'
import { ElementNode } from './element-node'

export class Support extends ElementNode {
	constructor(type: supportType, x: number, y: number) {
		super(x, y)
		this.constraints = constraints[type]
	}
}
