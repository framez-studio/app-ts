export function usePortraitOrientationLock() {
	const { orientation } = window.screen

	if ('lock' in orientation) {
		// console.log('first')
	}
}
