import '@styles/SliderArrow.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const ArrowLeftBtn: React.FC<Props> = ({ props }) => {
	return (
		<svg
			width={16}
			height={36}
			viewBox="0 0 16 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="slider-arrow"
			onPointerUp={props?.onClick}>
			<g clipPath="url(#clip0_812_774)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0.216569 17.0618L13.025 0.508598C13.532 -0.146592 14.4753 -0.268319 15.132 0.236714C15.7886 0.741747 15.91 1.68229 15.403 2.33748L3.26163 18.0286L15.403 33.7198C15.91 34.375 15.7886 35.3155 15.1319 35.8206C14.4753 36.3256 13.5319 36.2039 13.025 35.5487L0.216135 18.995C0.010859 18.7527 -0.107217 18.4562 -0.132181 18.1512C-0.164067 17.763 -0.0438036 17.3688 0.216569 17.0618Z"
					fill="currentColor"
				/>
			</g>
		</svg>
	)
}

export default ArrowLeftBtn
