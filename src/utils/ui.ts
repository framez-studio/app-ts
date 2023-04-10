import { responseDecimals } from '@config/ui'
import { ISteelNumRowsState, ISteelRowState } from '@interfaces'

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
