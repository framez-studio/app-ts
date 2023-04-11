import { responseDecimals } from '@config/ui'
import { ISteelNumRowsState, ISteelRowState } from '@interfaces'
import { coordinates2D } from '@types'

export function responseFormatter(response: number): string {
	return response.toFixed(responseDecimals)
}

export function stringifyObjectValues(
	obj: Record<string, any>,
): Record<string, string> {
	return JSON.parse(JSON.stringify(obj))
}

export function isRowFull(row: ISteelRowState | ISteelNumRowsState) {
	const { diameter, distance, quantity } = row
	return Number(diameter) && Number(distance) && Number(quantity)
}

export function toPlotterData(data: number[][]): coordinates2D[] {
	return data.map((row) => {
		if (row.length !== 2)
			throw new Error('Invalid data, must be a nx2 matrix')
		return { x: row[0], y: row[1] }
	})
}
