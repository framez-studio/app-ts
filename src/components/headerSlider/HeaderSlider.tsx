import { useState } from 'react'
import '@styles/HeaderSlider.sass'
import '@styles/Slider.sass'
import '@styles/_globals.sass'
import HeaderSliderSlot from '@components/headerSlider/HeaderSliderSlot'
import HeaderSliderBody from './HeaderSliderBody'
import { ActiveSectionContextProvider } from '@context/ActiveSectionContext'

const HeaderSlider = () => {
	const [isOpen, setIsOpen] = useState(false)
	const sliderOpener = () => setIsOpen(!isOpen)

	return (
		<ActiveSectionContextProvider props={{ default: 'structure' }}>
			<header
				className={`slider header-slider ${
					isOpen ? 'opened' : 'closed'
				}`}>
				<HeaderSliderBody />
				<HeaderSliderSlot props={{ isOpen, onClick: sliderOpener }} />
			</header>
		</ActiveSectionContextProvider>
	)
}

export default HeaderSlider
