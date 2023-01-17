import React from 'react'
import '@styles/InputSlider.sass'
import FormSwitcherHeader from './FormSwitcherHeader'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const InputSliderBody: React.FC<Props> = ({ props }) => {
	return (
		<section className="input-slider-body">
			<FormSwitcherHeader />
		</section>
	)
}

export default InputSliderBody
