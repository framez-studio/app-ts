import '@styles/InfoTooltip.sass'
import React from 'react'
import { IconButton, Tooltip, ClickAwayListener } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'

interface Props extends React.HTMLProps<HTMLDivElement> {
	props: {
		text: string
	}
}

const InfoTooltip: React.FC<Props> = ({ props }) => {
	const [open, setOpen] = React.useState(false)

	function handleTooltipClose() {
		setOpen(false)
	}

	function handleTooltipToggle() {
		setOpen(!open)
	}
	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<Tooltip
				title={props.text}
				open={open}
				arrow
				PopperProps={{
					disablePortal: true,
					className: 'tooltip-message',
				}}
				disableFocusListener
				disableHoverListener
				disableTouchListener>
				<IconButton onClick={handleTooltipToggle}>
					<InfoRounded htmlColor="#676c72ff" fontSize="medium" />
				</IconButton>
			</Tooltip>
		</ClickAwayListener>
	)
}

export default InfoTooltip
