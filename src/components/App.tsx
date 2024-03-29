import '@styles/App.sass'
import '@styles/_globals.sass'
import { AppContextProvider } from '@context/AppContext'
import { PushoverContextProvider } from '@context/PushoverContext'
import { usePortraitOrientationLock } from '@hooks/usePortraitOrientationLock'
import HeaderSlider from '@components/headerSlider/HeaderSlider'
import InputSlider from '@components/inputSlider/InputSlider'
import AppCanvas from '@components/AppCanvas'

function App() {
	usePortraitOrientationLock()
	return (
		<div id="framez" className="app text-selection-disabled">
			<AppContextProvider>
				<PushoverContextProvider>
					<HeaderSlider />
					<AppCanvas />
					<InputSlider />
				</PushoverContextProvider>
			</AppContextProvider>
		</div>
	)
}

export default App
