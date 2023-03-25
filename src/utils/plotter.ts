import { IPlotterData, IPlotterSettings } from '@interfaces'
import { extractContextDims } from './canvas'

export function getGridPointDist(min: number, max: number, factor?: number) {
	const diff = max - min
	let result = Math.pow(10.0, Math.ceil(Math.log(diff) / Math.log(10.0)) - 1)
	switch (Math.floor(diff / result)) {
		case 7:
		case 6:
		case 5:
		case 4:
			result /= 2
			break
		case 3:
			result /= 4
			break
		case 2:
			result /= 5
			break
		case 1:
			result /= 10
			break
	}
	result *= factor ?? 1
	return result
}

export function plotGrid(
	ctx: CanvasRenderingContext2D,
	settings: IPlotterSettings,
	data: IPlotterData,
) {
	const { x, y } = data
	const { width, height } = extractContextDims(ctx)
	const axis = { x: createAxis(x), y: createAxis(y) }

	ctx.strokeStyle = '#666565'
	ctx.lineWidth = 0.5

	ctx.beginPath()
	for (let i = 0; i <= axis.x.slots; i++) {
		const x = (i * width) / axis.x.slots
		ctx.moveTo(x, 0)
		ctx.lineTo(x, height)
	}
	ctx.stroke()

	ctx.beginPath()
	for (let i = 0; i <= axis.y.slots; i++) {
		const y = (i * height) / axis.y.slots
		ctx.moveTo(0, y)
		ctx.lineTo(width, y)
	}
	ctx.stroke()
}

export function createAxis(data: number[]) {
	const min = Math.min(...data)
	const max = Math.max(...data)
	const step = getGridPointDist(min, max)
	const start = Math.floor(min / step) * step
	const slots = Math.ceil((max - min) / step)
	const end = start + step * slots
	return { start, end, step, slots }
}
