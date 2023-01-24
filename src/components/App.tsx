import '@styles/App.sass'
import '@styles/_globals.sass'
import Header from '@components/Header'
import InputSlider from '@components/InputSlider'
import CanvasRenderer from '@components/CanvasRenderer'

function App() {
	return (
		<div id="framez" className="app text-selection-disabled">
			<Header />
			<CanvasRenderer />
			<InputSlider />
		</div>
	)
}

export default App
