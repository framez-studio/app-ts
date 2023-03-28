import { responseDecimals } from '@config/ui'

export function responseFormatter(response: number): string {
	return response.toFixed(responseDecimals)
}

export function stringifyObjectValues(
	obj: Record<string, any>,
): Record<string, string> {
	return JSON.parse(JSON.stringify(obj))
}
