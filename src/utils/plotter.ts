import { IPlotterData, IPlotterSettings } from '@interfaces'

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
	// const { xLabel, yLabel } = settings

	let xAxis = { min: Math.min(...x), max: Math.max(...x), step: 0 }
	let yAxis = { min: Math.min(...y), max: Math.max(...y), step: 0 }

	xAxis.step = getGridPointDist(xAxis.min, xAxis.max)
	yAxis.step = getGridPointDist(yAxis.min, yAxis.max)

	const xGrid = {
		lines: Math.ceil((xAxis.max - xAxis.min) / xAxis.step),
		start: 0,
		end: 0,
	}
	const yGrid = {
		lines: Math.ceil((yAxis.max - yAxis.min) / yAxis.step),
		start: 0,
		end: 0,
	}

	xGrid.start = Math.floor(xAxis.min / xAxis.step) * xAxis.step
	xGrid.end = xGrid.start + xAxis.step * xGrid.lines

	yGrid.start = Math.floor(yAxis.min / yAxis.step) * yAxis.step
	yGrid.end = yGrid.start + yAxis.step * yGrid.lines

	// console.log(xGrid, xAxis, yGrid, yAxis)
	ctx.beginPath()
	ctx.strokeStyle = 'white'
	ctx.lineWidth = 1
	ctx.font = '2px Arial'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.fillStyle = 'white'
	for (let i = 0; i <= xGrid.lines; i++) {
		const x = xGrid.start + xAxis.step * i
		ctx.moveTo(x, yGrid.start)
		ctx.lineTo(x, yGrid.end)
		// ctx.fillText(x.toFixed(2), x, yGrid.end + 1)
	}
	for (let i = 0; i <= yGrid.lines; i++) {
		const y = yGrid.start + yAxis.step * i
		ctx.moveTo(xGrid.start, y)
		ctx.lineTo(xGrid.end, y)
		// ctx.fillText(y.toFixed(2), xGrid.start - 1, y)
	}
	ctx.stroke()
	ctx.closePath()
	// ctx.beginPath()
	// ctx.strokeStyle = 'white'
	// ctx.lineWidth = 2
	// ctx.moveTo(xStart, 0)
	// ctx.lineTo(xEnd, 0)
	// ctx.moveTo(0, yStart)
	// ctx.lineTo(0, yEnd)
	// ctx.stroke()
	// ctx.closePath()
	// ctx.beginPath()
	// ctx.strokeStyle = 'white'
	// ctx.lineWidth = 1
	// ctx.font = '16px Arial'
	// ctx.textAlign = 'center'
	// ctx.textBaseline = 'middle'
	// ctx.fillStyle = 'white'
	// ctx.fillText(xLabel, xEnd + 30, 0)
	// ctx.fillText(yLabel, 0, yEnd + 30)
	// ctx.stroke()
	// ctx.closePath()
}
