/**
 * Finds all the indexes of a value inside an array
 * @param arr - Array
 * @param val - Value to find
 * @returns An array containing all the indexes of the value. If the item doesn't exist, an empty array is returned.
 */
export const allIndexesOf = <T>(arr: T[], val: T): number[] => {
	const indexes: number[] = []
	arr.forEach((element, i) => {
		if (element === val) {
			indexes.push(i)
		}
	})
	return indexes
}
/**
 * Gets all the unique elements of a collection of elements.
 * @param elements - List of elements to filter
 * @returns - An array containing the unique elements.
 */
export const uniques = <T>(...elements: T[]): T[] => {
	let uniqueElements: T[] = []
	elements.forEach((element) => {
		if (!uniqueElements.includes(element)) {
			uniqueElements.push(element)
		}
	})
	return Array.from(uniqueElements) as T[]
}
