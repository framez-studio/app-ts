import { IElement, IFrameSystem, INode } from '@interfaces'
import { IFormSections } from '@types-ui'

export interface IAppState {
	structure: IFrameSystem
	isSolving: boolean
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
