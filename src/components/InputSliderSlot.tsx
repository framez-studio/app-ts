import React from 'react'
import '@styles/InputSlider.sass'
import ArrowDownwardBtn from './ArrowDownwardBtn'
import ArrowUpwardBtn from './ArrowUpwardBtn'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		isOpen: boolean
		onArrowClick(): void
	}
}

const InputSliderSlot: React.FC<Props> = ({ props }) => {
	return (
		<section className="input-slider-slot">
			{props.isOpen ? (
				<ArrowDownwardBtn props={{ onClick: props.onArrowClick }} />
			) : (
				<ArrowUpwardBtn props={{ onClick: props.onArrowClick }} />
			)}
		</section>
	)
}

export default InputSliderSlot
