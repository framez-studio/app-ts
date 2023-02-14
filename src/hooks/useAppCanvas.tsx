import { useRef, useState } from 'react'
import { IAppState } from '@interfaces'
import { IAppCanvasPointer, IAppCanvasCamera } from '@types-ui'
import {
	clearContext,
	transformContext,
	eucDistance,
	printStructure,
} from '@utils'
import { useDoubleClick } from '@hooks/useDoubleClick'
import { useCanvas } from '@hooks/useCanvas'

const maxPointersAllowed = 2
const pointers: IAppCanvasPointer[] = []
const camera: IAppCanvasCamera = {
	dx: 0,
	dy: 0,
	scale: 1,
}
let hadSimultaneousPointers = false
let pinchDistance = 0
export function useAppCanvas(state: IAppState) {
	const { canvasRef, setTracer } = useCanvas()
	const { checkDoubleClick } = useDoubleClick(handleDoubleClick)

	function updateScreen() {
		const draw = (
			ctx: CanvasRenderingContext2D,
			canvas: HTMLCanvasElement,
		) => {
			clearContext(ctx)
			setCamera(ctx)
			printStructure(ctx, state.structure, 'static')
		}
		return setTracer(draw)
	}
	function handlePointerDown(e: React.PointerEvent) {
		if (pointers.length == maxPointersAllowed) return
		const pointer = extractPointerInfo(e)
		registerPointer(pointer)
		setInteractions()
	}
	function handlePointerUp(e: React.PointerEvent) {
		const { id } = extractPointerInfo(e)
		const pointer = getPointerById(id)
		if (!pointer) return
		deletePointer(pointer)
		resetInteractions()
		checkDoubleClick(e)
		updateScreen()
	}
	function handlePointerMove(e: React.PointerEvent) {
		handleMove(e)
		updateScreen()
	}
	function handleWheel(e: React.WheelEvent) {
		let { clientX: x, clientY: y, deltaY: factor } = e
		factor = factor < 0 ? 1.1 : 0.9
		zoomCamera(factor, { x, y })
		updateScreen()
	}
	return {
		canvasRef,
		updateScreen,
		handlePointerUp,
		handlePointerDown,
		handlePointerMove,
		handleWheel,
	}
}

function setCamera(ctx: CanvasRenderingContext2D) {
	const { dx, dy, scale } = camera
	const transformation = {
		dx: -dx,
		dy: -dy,
		scale: scale,
	}
	transformContext(ctx, transformation)
}
function resetCamera() {
	camera.dx = 0
	camera.dy = 0
	camera.scale = 1
}
function moveCamera(diff: { dx?: number; dy?: number }) {
	camera.dx += diff.dx ?? 0
	camera.dy += diff.dy ?? 0
}
function zoomCamera(scale: number, focus: { x: number; y: number }) {
	const { x, y } = focus
	const translate = {
		dx: (x + camera.dx) * (scale - 1),
		dy: (y + camera.dy) * (scale - 1),
	}
	camera.scale *= scale
	moveCamera(translate)
}
function handleDrag(e: React.PointerEvent, pointer: IAppCanvasPointer) {
	const { coords: newCoords } = extractPointerInfo(e)
	const { coords: oldCoords } = pointer
	const translate = {
		dx: -(newCoords.x - oldCoords.x),
		dy: -(newCoords.y - oldCoords.y),
	}
	pointer.coords = { ...newCoords }
	if (!isZoomActive()) moveCamera(translate)
}
function handleZoom(e: React.PointerEvent) {
	let oldDistance = pinchDistance
	let newDistance = getPinchDistance()
	let zoomFactor = newDistance / oldDistance
	let zoomFocus = getPinchFocus()
	zoomCamera(zoomFactor, zoomFocus)
	pinchDistance = newDistance
}
function handleHover(e: React.PointerEvent) {
	let x = (e.clientX + camera.dx) / camera.scale
	let y = (e.clientX + camera.dy) / camera.scale
	console.log(`hovering at ${x},${y} at ${e.timeStamp}`)
}
function handleMove(e: React.PointerEvent) {
	let { id } = extractPointerInfo(e)
	let pointer = getPointerById(id)

	if (!isPressing()) handleHover(e)
	if (!pointer) return
	if (isDragActive()) handleDrag(e, pointer)
	if (isZoomActive()) handleZoom(e)
}
function handleDoubleClick(e?: React.PointerEvent) {
	if (!hadSimultaneousPointers) resetCamera()
}
function extractPointerInfo(e: React.PointerEvent): IAppCanvasPointer {
	const { pointerId: id, clientX: x, clientY: y } = e
	return { id, coords: { x, y } }
}
function registerPointer(pointer: IAppCanvasPointer) {
	if (pointers.length == maxPointersAllowed) return
	if (getPointerById(pointer.id)) return
	if (pointers.length == 0) hadSimultaneousPointers = false
	pointers.push(pointer)
}
function getPointerById(id: number): null | IAppCanvasPointer {
	let index = pointers.findIndex((pointer) => pointer.id === id)
	if (index === -1) return null
	return pointers[index]
}
function deletePointer(pointer: IAppCanvasPointer) {
	let index = pointers.indexOf(pointer)
	if (index == -1)
		throw new Error(
			`Couldn't delete pointer since it doesn't exist in pointers array.`,
		)
	if (pointers.length > 1) hadSimultaneousPointers = true
	pointers.splice(index, 1)
}
function getPinchDistance() {
	if (pointers.length < 2)
		throw new Error(
			`Couldn't get pinch distance. There's less than two pointers registered.`,
		)
	return eucDistance(pointers[0].coords, pointers[1].coords)
}
function getPinchFocus() {
	if (pointers.length < 2)
		throw new Error(
			`Couldn't get pinch focus. There's less than two pointers registered.`,
		)
	let x = (pointers[0].coords.x + pointers[1].coords.x) / 2
	let y = (pointers[0].coords.y + pointers[1].coords.y) / 2
	return { x, y }
}
function isDragActive() {
	return pointers.length >= 1
}
function isZoomActive() {
	return pointers.length >= 2
}
function isPressing() {
	return pointers.length > 0
}
function setInteractions() {
	// zoom interaction
	if (isZoomActive()) pinchDistance = getPinchDistance()
}
function resetInteractions() {
	// zoom interaction
	if (!isZoomActive()) pinchDistance = 0
}
