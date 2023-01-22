import React from 'react'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onClick?(): void
	}
}

const DeleteBtn: React.FC<Props> = ({ props }) => {
	return (
		<svg
			width={18}
			height={18}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onPointerUp={props?.onClick}>
			<g clipPath="url(#clip0_455_690)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M4.50004 1.49977C3.67162 0.67134 2.32848 0.67134 1.50005 1.49977C0.671628 2.32819 0.671628 3.67133 1.50005 4.49976L6.00016 8.99986L1.50011 13.4999C0.671677 14.3283 0.671677 15.6715 1.50011 16.4999C2.32854 17.3284 3.67169 17.3284 4.50012 16.4999L9.00017 11.9999L13.5001 16.4998C14.3285 17.3282 15.6717 17.3282 16.5001 16.4998C17.3285 15.6714 17.3285 14.3282 16.5001 13.4998L12.0002 8.99988L16.5001 4.49998C17.3285 3.67155 17.3285 2.3284 16.5001 1.49997C15.6716 0.67154 14.3285 0.67154 13.5001 1.49997L9.00015 5.99987L4.50004 1.49977Z"
					fill="#676C72"
				/>
			</g>
			<defs>
				<clipPath id="clip0_455_690">
					<rect width={18} height={18} fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}

export default DeleteBtn
