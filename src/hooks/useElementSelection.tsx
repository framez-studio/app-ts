import { IElement } from '@interfaces'
import { useAppContext } from '@context/AppContext'
import { useEffect, useState } from 'react'
import { useStructureAPI } from '@hooks/useStructureAPI'
import { forcesArrayToObject } from '@utils/elements'

export function useElementSelection() {
	const context = useAppContext()
	const { state } = context
	const { requestStructureSolver } = useStructureAPI()

	if (state.canvas.selection.type != 'element')
		throw new Error('No Element selected')

	const element = state.canvas.selection.object as IElement

	const [young, updateYoung] = useState(element.young)
	const [sectionDims, updateSectionDims] = useState({
		base: element.section.b,
		height: element.section.h,
	})
	const [load, updateLoad] = useState(element.loads[0].load)
	const [response, updateResponse] = useState(
		forcesArrayToObject(element.forces),
	)

	function setYoung(newYoung: number) {
		element.section.material.young = newYoung
		updateYoung(newYoung)
		requestStructureSolver()
	}
	function setLoad(newLoad: number) {
		element.loads[0].load = newLoad
		updateLoad(newLoad)
		requestStructureSolver()
		context.requestCanvasRedraw()
	}
	function setSectionDims(newDims: { base?: number; height?: number }) {
		const { section } = element
		section.b = newDims.base ?? section.b
		section.h = newDims.height ?? section.h
		updateSectionDims({
			base: section.b,
			height: section.h,
		})
		requestStructureSolver()
	}
	function setSectionBase(base: number) {
		setSectionDims({ base })
	}
	function setSectionHeight(height: number) {
		setSectionDims({ height })
	}

	useEffect(() => {
		updateYoung(element.young)
		updateSectionDims({
			base: element.section.b,
			height: element.section.h,
		})
		updateLoad(element.loads[0].load)
		updateResponse(forcesArrayToObject(element.forces))
	}, [element])

	return {
		young,
		setYoung,
		sectionDims,
		setSectionBase,
		setSectionHeight,
		load,
		setLoad,
		response,
	}
}
