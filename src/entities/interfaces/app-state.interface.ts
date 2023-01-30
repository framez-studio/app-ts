import { IElement, INode, IStructure } from '@interfaces'

export interface IAppState {
	structure: IStructure
	selection: {
		type: null | 'node' | 'element'
		object: null | INode | IElement
	}
}
