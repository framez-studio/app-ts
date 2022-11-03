/**
 * Finds all the indexes of a value inside an array
 * @param arr - Array
 * @param val - Value to find
 * @returns - An array containing all the indexes of the value. If the item doesn't exist, an empty array is returned.
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
