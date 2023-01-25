import '@styles/App.sass'
import '@styles/_globals.sass'
import Header from '@components/Header'
import InputSlider from '@components/InputSlider'
import CanvasRenderer from '@components/CanvasRenderer'
import { useWindowsSize } from '@hooks/useWindowSize'

function App() {
	const { height: windowHeight, width: windowWidth } = useWindowsSize()
	return (
		<div id="framez" className="app text-selection-disabled">
			<Header />
			<CanvasRenderer
				props={{ width: windowWidth, height: windowHeight }}
			/>
			<InputSlider />
		</div>
	)
}

export default App
