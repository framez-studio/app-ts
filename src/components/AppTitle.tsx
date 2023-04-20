import React from 'react'
import '@styles/HeaderSlider.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const AppTitle: React.FC<Props> = ({ props, className }) => {
	const appTitle = 'FramezStudio'

	return (
		<span
			className={`header-title ${className ?? ''}`}
			onPointerUp={props?.onClick}>
			{appTitle}
		</span>
	)
}

export default AppTitle
