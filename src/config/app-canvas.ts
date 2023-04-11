// coordinate system origin from left/bottom corner in pixels
export const origin = { x: 40, y: 80 }
// scale factor from pixels to meters
export const scale = {
	pixels: 60,
	meters: 1,
}
// graphic elements properties, all units are in pixels
export const graphics = {
	element: {
		width: 6,
		fill: '#BBBBBB',
		outline: {
			width: 1.5,
			hovered: '#653AAA',
			selected: '#8D4BF6',
		},
	},
	node: {
		radius: 12,
		fill: '#D9D9D9',
		outline: {
			width: 2,
			hovered: '#653AAA',
			selected: '#8D4BF6',
		},
	},
	supports: {
		fixed: {
			width: 36,
			height: 18,
			radius: 4,
		},
		fill: '#D9D9D9',
		outline: {
			width: 2,
			hovered: '#653AAA',
			selected: '#8D4BF6',
		},
	},
	loads: {
		fill: '#d00000',
		height: 12,
		lineWidth: 0.8,
		minSeparation: 8,
	},
	hinges: {
		fill: '#8D4BF6',
		radius: 6,
	},
}
