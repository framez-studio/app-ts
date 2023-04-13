import '@styles/SliderArrow.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const ArrowRightBtn: React.FC<Props> = ({ props }) => {
	return (
		<svg
			width={16}
			height={36}
			viewBox="0 0 16 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="slider-arrow"
			onPointerUp={props?.onClick}>
			<g clipPath="url(#clip0_812_766)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M15.4253 18.9382L2.61686 35.4914C2.10989 36.1466 1.16657 36.2683 0.509883 35.7633C-0.146802 35.2583 -0.268168 34.3177 0.238799 33.6625L12.3802 17.9714L0.23882 2.28022C-0.268149 1.62503 -0.146781 0.684478 0.509902 0.179447C1.16659 -0.325589 2.10991 -0.203862 2.61688 0.451328L15.4257 17.0051C15.631 17.2473 15.749 17.5437 15.774 17.8487C15.8059 18.2369 15.6857 18.6312 15.4253 18.9382Z"
					fill="currentColor"
				/>
			</g>
		</svg>
	)
}

export default ArrowRightBtn
