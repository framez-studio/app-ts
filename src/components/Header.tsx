import { useState } from 'react'
import '@styles/Header.sass'
import '@styles/Slider.sass'
import '@styles/_globals.sass'
import HeaderSlot from '@components/HeaderSlot'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const sliderOpener = () => setIsOpen(!isOpen)

	return (
		<header
			className={`slider header-slider ${isOpen ? 'opened' : 'closed'}`}>
			<HeaderSlot props={{ isOpen, onClick: sliderOpener }} />
		</header>
	)
}

export default Header
