import { useAppContext } from '@context/AppContext'
import { structureJSONString } from '@utils/file-management'

export function useStructureLoader() {
	const { state } = useAppContext()
	const { structure } = state

	function downloadStructure() {
		const json = structureJSONString(structure)
		console.log(json)
		const blob = new Blob([json], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')

		link.setAttribute('href', url)
		link.setAttribute('download', 'structure.framez')
		link.click()
	}

	async function loadStructure() {
		console.log('loading')
	}
	return { downloadStructure, loadStructure }
}
