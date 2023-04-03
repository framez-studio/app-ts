import { useState } from 'react'
import '@styles/Form.sass'
import { IHeaderSections } from '@types-ui'
import HeaderSliderHeader from './HeaderSliderHeader'
import HeaderSliderBodySwitcher from './HeaderSliderBodySwitcher'

const HeaderSliderBody = () => {
	const [activeSection, setActiveSection] =
		useState<IHeaderSections>('structure')
	return (
		<section className="slider-body">
			<HeaderSliderHeader props={{ activeSection, setActiveSection }} />
			<HeaderSliderBodySwitcher props={{ activeSection }} />
		</section>
	)
}

export default HeaderSliderBody
