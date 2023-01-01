import React from 'react'
import '@styles/SliderArrow.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const ArrowDownwardBtn: React.FC<Props> = ({ props }) => {
	return (
		<svg
			width="39"
			height="18"
			viewBox="0 0 39 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="slider-arrow"
			onClick={props?.onClick}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18.5641 17.1368L0.641105 3.26848C-0.014085 2.76151 -0.135812 1.81819 0.369221 1.1615C0.874254 0.50482 1.8148 0.383453 2.46999 0.890421L19.531 14.0918L36.5919 0.890442C37.2471 0.383472 38.1876 0.504841 38.6927 1.16153C39.1977 1.81821 39.076 2.76153 38.4208 3.2685L20.4973 17.1373C20.2556 17.342 19.96 17.46 19.6558 17.4854C19.2669 17.5179 18.8717 17.3977 18.5641 17.1368Z"
				fill="currentColor"></path>
		</svg>
	)
}

export default ArrowDownwardBtn
