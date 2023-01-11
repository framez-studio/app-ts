import '@styles/App.sass'
import Header from './Header'
import InputSlider from './InputSlider'
import CanvasRenderer from './CanvasRenderer'

function App() {
	return (
		<div id="framez" className="app">
			<Header />
			<CanvasRenderer />
			<InputSlider />
		</div>
	)
}

export default App
