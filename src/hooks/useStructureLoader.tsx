import { useEffect, useRef, useState } from 'react'
import { useAppContext } from '@context/AppContext'
import { structureJSONString } from '@utils/file-management'
import { FramezFile } from '@interfaces'
import { generateStructureFromFile } from '@utils/framez-file-parser'

export function useStructureLoader() {
	const { state, setStructure } = useAppContext()
	const { structure } = state

	const [file, setFile] = useState<File>()
	const downloadAnchorRef = useRef(document.createElement('a'))

	function downloadStructure() {
		const json = structureJSONString(structure)
		const blob = new Blob([json], { type: 'application/json' })
		const url = URL.createObjectURL(blob)

		downloadAnchorRef.current.setAttribute('href', url)
		downloadAnchorRef.current.setAttribute('download', 'structure.framez')
		downloadAnchorRef.current.click()
	}

	function handleUploadInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setFile(e.target.files[0])
		}
	}

	async function setFileChange() {
		if (!file) return
		if (getFileExtension(file.name) !== 'framez') return

		const text = await file.text()
		const loadedStructureFile = JSON.parse(text) as FramezFile
		const loadedStructure = generateStructureFromFile(loadedStructureFile)

		setStructure(loadedStructure)
	}

	useEffect(() => {
		setFileChange()
	}, [file])

	return { downloadStructure, handleUploadInputChange }
}

function getFileExtension(filename: string) {
	return filename.split('.')[1]
}
