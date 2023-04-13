// multiplier
const alpha = 1
// border separation from first support in pixels
const margin = 30
const border = {
	left: margin,
	bottom: margin + 60, // 60 is the height of the slider
}
// scale factor from pixels to meters
export const scale = {
	pixels: 60 + 2.5 * alpha,
	meters: 1,
}
// graphic elements properties, all units are in pixels
export const graphics = {
	element: {
		width: 6 * alpha,
		fill: '#BBBBBB',
		outline: {
			width: 2 * alpha,
			hovered: '#653AAA',
			selected: '#8D4BF6',
		},
	},
	node: {
		radius: 12 * alpha,
		fill: '#D9D9D9',
		outline: {
			width: 2 * alpha,
			hovered: '#653AAA',
			selected: '#8D4BF6',
		},
	},
	supports: {
		fixed: {
			width: 36 * alpha,
			height: 18 * alpha,
			radius: 4 * alpha,
		},
		fill: '#D9D9D9',
		outline: {
			width: 2 * alpha,
			hovered: '#653AAA',
			selected: '#8D4BF6',
		},
	},
	loads: {
		fill: '#d00000',
		height: 12 * alpha,
		lineWidth: 0.8 * alpha,
		minSeparation: 8 * alpha,
	},
	hinges: {
		fill: '#8D4BF6',
		radius: 6 * alpha,
	},
}
// coordinate system origin from left/bottom corner in pixels
export const origin = {
	x: border.left + graphics.supports.fixed.width / 2,
	y: border.bottom + graphics.supports.fixed.height / 2,
}
// change origin when standalone
const pwaMode = window.matchMedia('(display-mode: standalone)').matches
if (pwaMode) origin.y += 20
