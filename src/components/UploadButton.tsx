import '@styles/FormButton.sass'
import { useRef } from 'react'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		text: string
		onChange?(e: React.ChangeEvent<HTMLInputElement>): void
	}
}

const UploadButton: React.FC<Props> = ({ props, className }) => {
	const { text, onChange } = props
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<>
			<button
				className={`form-button hoverable ${className ?? ''}`}
				onPointerUp={handleUpload}>
				{text}
			</button>
			<input
				ref={inputRef}
				onChange={onChange}
				type="file"
				className="inexistent"
			/>
		</>
	)
	function handleUpload() {
		if (!inputRef.current) return
		inputRef.current.click()
	}
}

export default UploadButton
