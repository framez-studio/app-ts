import React, { useState } from 'react'
import '@styles/InputSliderSlot.sass'
import ArrowDownwardBtn from './ArrowDownwardBtn'
import ArrowUpwardBtn from './ArrowUpwardBtn'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		isOpen: boolean
	}
}

const InputSliderSlot: React.FC<Props> = ({ props }) => {
	const [isOpen, setIsOpen] = useState(props.isOpen ?? false)
	const clickHandler = () => setIsOpen(!isOpen)

	return (
		<section className="slider-slot">
			{isOpen ? (
				<ArrowDownwardBtn props={{ onClick: clickHandler }} />
			) : (
				<ArrowUpwardBtn props={{ onClick: clickHandler }} />
			)}
		</section>
	)
}

export default InputSliderSlot
