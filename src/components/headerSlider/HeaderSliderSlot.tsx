import React from 'react'
import '@styles/HeaderSlider.sass'
import ArrowUpwardBtn from '@components/svg/ArrowUpwardBtn'
import AppTitle from '../AppTitle'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		isOpen: boolean
		onClick(): void
	}
}

const HeaderSliderSlot: React.FC<Props> = ({ props }) => {
	return (
		<section className="slider-slot">
			{props.isOpen ? (
				<ArrowUpwardBtn props={{ onClick: props.onClick }} />
			) : (
				<AppTitle props={{ onClick: props.onClick }} />
			)}
		</section>
	)
}

export default HeaderSliderSlot
