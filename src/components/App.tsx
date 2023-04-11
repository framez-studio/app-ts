import '@styles/App.sass'
import '@styles/_globals.sass'
import { AppContextProvider } from '@context/AppContext'
import HeaderSlider from '@components/headerSlider/HeaderSlider'
import InputSlider from '@components/inputSlider/InputSlider'
import AppCanvas from '@components/AppCanvas'

function App() {
	return (
		<div id="framez" className="app text-selection-disabled">
			<AppContextProvider>
				<HeaderSlider />
				<AppCanvas />
				<InputSlider />
			</AppContextProvider>
		</div>
	)
}

export default App
