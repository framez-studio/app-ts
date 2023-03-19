import { responseDecimals } from '@config'

export function responseFormatter(response: number): string {
	return response.toFixed(responseDecimals)
}
