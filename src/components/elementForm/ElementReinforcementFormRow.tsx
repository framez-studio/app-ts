import React from 'react'
import FormInput from '@components/FormInput'
import DeleteBtn from '@components/svg/DeleteBtn'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props?: {
		onDelete?(): void
	}
}

const ElementReinforcementFormRow: React.FC<Props> = ({ props }) => {
	return (
		<>
			<FormInput />
			<FormInput props={{ suffix: 'mm' }} />
			<FormInput props={{ suffix: 'mm' }} />
			<DeleteBtn props={{ onClick: props?.onDelete }} />
		</>
	)
}

export default ElementReinforcementFormRow
