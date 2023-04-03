import { useState } from 'react'
import '@styles/HeaderSlider.sass'
import '@styles/Slider.sass'
import '@styles/_globals.sass'
import HeaderSliderSlot from '@components/headerSlider/HeaderSliderSlot'
import HeaderSliderBody from './HeaderSliderBody'

const HeaderSlider = () => {
	const [isOpen, setIsOpen] = useState(false)
	const sliderOpener = () => setIsOpen(!isOpen)

	return (
		<header
			className={`slider header-slider ${isOpen ? 'opened' : 'closed'}`}>
			<HeaderSliderBody />
			<HeaderSliderSlot props={{ isOpen, onClick: sliderOpener }} />
		</header>
	)
}

export default HeaderSlider
