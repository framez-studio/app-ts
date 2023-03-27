import React from 'react'
import '@styles/SliderBtn.sass'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const AddBtn: React.FC<Props> = ({ props }) => {
	return (
		<svg
			width={21}
			height={21}
			viewBox="0 0 21 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="slider-btn"
			onPointerUp={props?.onClick}>
			<g clipPath="url(#clip0_455_718)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12.6001 2.1C12.6001 0.940202 11.6599 0 10.5001 0C9.34034 0 8.40014 0.940203 8.40014 2.1V8.40016H2.10001C0.940208 8.40016 0 9.34036 0 10.5002C0 11.66 0.940208 12.6002 2.10001 12.6002H8.40014L8.40014 18.9001C8.40014 20.0599 9.34034 21.0001 10.5001 21.0001C11.6599 21.0001 12.6001 20.0599 12.6001 18.9001L12.6001 12.6002L18.9 12.6002C20.0598 12.6002 21 11.66 21 10.5002C21 9.34036 20.0598 8.40016 18.9 8.40016L12.6001 8.40016V2.1Z"
					fill="currentColor"
				/>
			</g>
			<defs>
				<clipPath id="clip0_455_718">
					<rect width={21} height={21} fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}

export default AddBtn
