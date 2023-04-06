import { IElement, INode, IStructure } from '@interfaces'
import { IFormSections } from '@types-ui'

export interface IAppState {
	structure: IStructure
	canvas: {
		selection: {
			type: null | 'node' | 'element'
			object: null | INode | IElement
		}
		needsRedraw: boolean
	}
	interactions: {
		isZooming: boolean
		isDragging: boolean
	}
	slider: {
		isOpen: boolean
		activeSection: IFormSections
	}
}
