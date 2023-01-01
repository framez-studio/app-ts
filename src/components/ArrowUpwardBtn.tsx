import React from 'react'
import '@styles/SliderArrow.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const ArrowUpwardBtn: React.FC<Props> = ({ props }) => {
	return (
		<svg
			width={39}
			height={17}
			viewBox="0 0 39 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="slider-arrow"
			onClick={props?.onClick}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18.5489 0.397021L0.625968 14.2653C-0.0292217 14.7723 -0.150948 15.7156 0.354085 16.3723C0.859117 17.029 1.79966 17.1504 2.45485 16.6434L19.5158 3.44206L36.5768 16.6434C37.232 17.1503 38.1725 17.029 38.6775 16.3723C39.1826 15.7156 39.0609 14.7723 38.4057 14.2653L20.4821 0.396558C20.2405 0.191801 19.9449 0.0738025 19.6407 0.0484309C19.2517 0.0158727 18.8565 0.136108 18.5489 0.397021Z"
				fill="currentColor"
			/>
		</svg>
	)
}

export default ArrowUpwardBtn
