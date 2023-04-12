import { responseDecimals } from '@config/ui'
import { ISteelNumRowsState, ISteelRowState } from '@interfaces'
import { coordinates2D } from '@types'
import { IUnitFactors, supportedUnits } from '@types-ui'

const unitFactors: IUnitFactors = {
	MPa: {
		kPa: {
			operator: 'multiply',
			factor: 1000,
		},
	},
	kPa: {
		MPa: {
			operator: 'divide',
			factor: 1000,
		},
	},
	m: {
		mm: {
			operator: 'multiply',
			factor: 1000,
		},
	},
	mm: {
		m: {
			operator: 'divide',
			factor: 1000,
		},
	},
}

export function responseFormatter(response: number | string): string {
	let result = typeof response === 'string' ? Number(response) : response
	return result.toFixed(responseDecimals)
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

export function capacityCurveToPlotter(data: number[][]): coordinates2D[] {
	return data.map((row) => {
		if (row.length !== 2)
			throw new Error('Invalid data, must be a nx2 matrix')

		const x = outputUnitsFilter({
			value: row[0],
			from: 'm',
			to: 'mm',
			formatter: responseFormatter,
		})
		const y = responseFormatter(row[1])
		return { x: Number(x), y: Number(y) }
	})
}

export function outputUnitsFilter(config: {
	value: string | number
	from: supportedUnits
	to: supportedUnits
	formatter?: (value: number | string) => string
}): string {
	const { value, from, to, formatter } = config
	const conversor = unitFactors[from][to]

	if (!conversor)
		throw new Error(`Invalid units conversion from ${from} to ${to}`)

	let output = Number(value)
	let { factor, operator } = conversor

	if (operator === 'divide') output /= factor
	else output *= factor

	if (formatter) return formatter(output)
	return output.toFixed(responseDecimals)
}

export function inputUnitsFilter(config: {
	value: string | number
	from: supportedUnits
	to: supportedUnits
}): string {
	const { value, from, to } = config
	const conversor = unitFactors[from][to]

	if (!conversor)
		throw new Error(`Invalid units conversion from ${from} to ${to}`)

	let output = Number(value)
	let { factor, operator } = conversor

	if (operator === 'divide') output /= factor
	else output *= factor

	return output.toString()
}

export function getZerosCount(value: number | string): number {
	const num = value.toString()
	const match = num.match(/(\.0*)/)
	if (!match) return 0
	return match[0].length - 1
}
