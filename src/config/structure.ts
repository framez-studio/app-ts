import { PorticSystemGenerator } from '@utils/structure'

const levels = {
	quantity: 2,
	separation: 2,
}
const spans = {
	quantity: 2,
	separation: 2,
}

export const { structure: initialStructure } = PorticSystemGenerator({
	levels,
	spans,
})
