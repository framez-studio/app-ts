import { responseDecimals } from '@config/ui'

export function responseFormatter(response: number): string {
	return response.toFixed(responseDecimals)
}
