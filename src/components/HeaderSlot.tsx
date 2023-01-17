import React from 'react'
import '@styles/Header.sass'
import '@styles/_globals.sass'
import ArrowDownwardBtn from './ArrowDownwardBtn'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		isOpen: boolean
		onClick(): void
	}
}

const HeaderSlot: React.FC<Props> = ({ props }) => {
	return (
		<section className="header-slot">
			{props.isOpen ? (
				<ArrowDownwardBtn props={{ onClick: props.onClick }} />
			) : (
				<span className="header-title" onClick={props.onClick}>
					FramezStudio
				</span>
			)}
		</section>
	)
}

export default HeaderSlot
