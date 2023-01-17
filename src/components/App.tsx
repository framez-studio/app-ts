import '@styles/App.sass'
import '@styles/_globals.sass'
import Header from './Header'
import InputSlider from './InputSlider'
import CanvasRenderer from './CanvasRenderer'

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
