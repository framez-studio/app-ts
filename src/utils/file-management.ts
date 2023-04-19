import { ElementNode } from '@classes/nodes/element-node'
import { RectangularSpanLoad } from '@classes/others/rectangular-span-load'
import { IStructure } from '@interfaces'

type IGraphData = {
	[key: string]: string | number | boolean
}[]

export function graphToCSVString(config: {
	graphData: IGraphData
	keys?: string[]
	headers?: string[]
}) {
	const { graphData, keys, headers } = config

	const hasHeaders = headers && headers.length > 0
	const hasKeys = keys && keys.length > 0

	if (hasHeaders && headers.length > Object.keys(graphData[0]).length)
		throw new Error('Headers length is higher than graphData length')
	if (hasKeys && keys.length > Object.keys(graphData[0]).length)
		throw new Error('Keys length is higher than graphData length')
	if (hasHeaders && hasKeys && headers.length !== keys.length)
		throw new Error("Headers length doesn't match keys length")

	const csv = graphData.map((row) => {
		const csvRow = hasKeys
			? keys.map((header) => row[header])
			: Object.values(row)
		return csvRow.join(',')
	})
	if (hasHeaders) {
		csv.unshift(headers.join(','))
	}
	return csv.join('\n')
}

export function downloadGraphToCSVFile(config: {
	graphData: IGraphData
	keys?: string[]
	headers?: string[]
}) {
	const csv = graphToCSVString(config)
	const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')

	link.setAttribute('href', url)
	link.setAttribute('download', 'data.csv')
	link.click()
}
export function structureJSONString(structure: IStructure) {
	function replacer(_key: string, value: any) {
		let output: any | undefined = value

		if (value instanceof ElementNode) {
			output._elements = undefined
		} else if (value instanceof RectangularSpanLoad) {
			output.element = undefined
		}

		return output
	}
	return JSON.stringify(structure, replacer)
}
