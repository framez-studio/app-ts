import '@styles/App.sass'
import '@styles/_globals.sass'
import { AppContextProvider } from '@context/AppContext'
import Header from '@components/Header'
import InputSlider from '@components/InputSlider'
import AppCanvas from '@components/AppCanvas'

function App() {
	return (
		<AppContextProvider>
			<div id="framez" className="app text-selection-disabled">
				<Header />
				<AppCanvas />
				<InputSlider />
			</div>
		</AppContextProvider>
	)
}

export default App
