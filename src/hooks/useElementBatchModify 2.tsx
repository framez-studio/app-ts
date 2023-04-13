import { useState } from 'react'
import { useElementState } from './useElementState'

export function useElementBatchModify() {
	const [batchType, setBatchType] = useState<'beam' | 'column'>('beam')
	const { state } = useElementState()

	return { batchType, setBatchType }
}
