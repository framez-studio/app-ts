export const uniques = <T>(...elements: T[]): T[] => {
	let uniqueElements = new Set()
	elements.forEach((element) => uniqueElements.add(element))
	return Array.from(uniqueElements) as T[]
}
