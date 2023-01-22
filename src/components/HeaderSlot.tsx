import React from 'react'
import '@styles/Header.sass'
import '@styles/_globals.sass'
import ArrowUpwardBtn from '@components/svg/ArrowUpwardBtn'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		isOpen: boolean
		onClick(): void
	}
}

const HeaderSlot: React.FC<Props> = ({ props }) => {
	const appTitle = 'FramezStudio'
	return (
		<section className="header-slot">
			{props.isOpen ? (
				<ArrowUpwardBtn props={{ onClick: props.onClick }} />
			) : (
				<span className="header-title" onPointerUp={props.onClick}>
					{appTitle}
				</span>
			)}
		</section>
	)
}

export default HeaderSlot
